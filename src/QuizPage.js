import React, {useEffect, useState} from "react"
import Question from "./Question";



export default function QuizPage({startQuiz}){
    
    const [questions, setQuestions] = useState([])        
    const [score, setScore] =useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [PlayAgain, setPlayAgain] = useState(false)

    function handleAnswer(answer, question) {
        
        if(gameOver===false){

        setQuestions((prevValue) => {
            const newValue = prevValue
            const findObj = newValue.filter(element => element.question.questionOnly === question)           
            findObj[0].question.answers.filter(element => {
               return element.name === answer.name ? element.isSelected=true : element.isSelected=false 
            }) 
            
            return newValue
        })

        }
    }

    function handleCheck(){
       const correctAnswersArray = questions.map(element => element.question.answers.filter(elementi => elementi.isSelected===true && elementi.isCorrect===true) )
       const correctAnswersArray1= correctAnswersArray.filter(element => element.length>0)
       setScore(correctAnswersArray1.length)
       setGameOver(true)
    }

    function handlePlayAgain(){
        setPlayAgain(prevValue => !prevValue)
        setGameOver(false)
        setQuestions([])    
        setScore(0)
    }

    useEffect(()=> {
        fetch('https://opentdb.com/api.php?amount=5')
        .then(response => response.json())
        .then(data => {
            // fetch answers and questions
            const correct_answers = data.results.map(element=> element.correct_answer)
            const incorrect_answers = data.results.map(element=> element.incorrect_answers)
            const questionsOnly =data.results.map(element=> element.question)   
            // 
           
            // combine correct and incorrect answers
            for (let i = 0; i < data.results.length; i++) {
                incorrect_answers[i].push(correct_answers[i]);
            }
            const allAnswers =incorrect_answers
            //

            // filter all answers and give isSelected property
            const allAnswersFiltered = allAnswers.map(arr => [...new Set(arr)]);
            let allAnswersFiltered1 = allAnswersFiltered.map(subArray => subArray.map(value => 
                Object.assign({}, {name: value, isSelected: false})
            ));

            
            
            for(let i=0; i<correct_answers.length; i++) {
               const giveIscorrect= allAnswersFiltered1[i].filter(element => element.name === correct_answers[i])[0]
               const giveIsWrong = allAnswersFiltered1[i].filter(element => element.name !== correct_answers[i])
               giveIscorrect.isCorrect = true
               giveIsWrong.forEach(element => element.isCorrect = false )
            }
            //
      
            // sort all answers
            for(let i=0; i<allAnswersFiltered1.length;i++){ 
                allAnswersFiltered1[i].sort(() => Math.random() - 0.5);
            }
            //

            // create array of objects to render questions   
            let arrOfObjects = questionsOnly.map(item => ({ question: {questionOnly:item } }));
            for(let i=0; i<arrOfObjects.length; i++){
                arrOfObjects[i].question.answers =  allAnswersFiltered1[i]
            }
            //

            //  give  data to the state for a site to function
           setQuestions(arrOfObjects)
            //

        })

    },[startQuiz, PlayAgain])

    
   
    
    const renderQuestions =  questions.map(element =>  
    <Question 
        key={element.question.questionOnly}
        question={element.question.questionOnly}  
        answers={element.question.answers}
        handleAnswer={handleAnswer}
        gameOver={gameOver} 
    />)
     
    return <div className="quiz-div">
            <div className="quiz-div__questions">{renderQuestions}</div>
            {gameOver && <h5> your score is {score}</h5>}
            {gameOver?<button onClick={()=>handlePlayAgain()} >Play Again</button>:
            <button onClick={()=>handleCheck()} >Check Answers</button>}
            </div>
}



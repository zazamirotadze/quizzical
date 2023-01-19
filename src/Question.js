import React, {useState} from "react"



export default function Question({question,answers, handleAnswer, gameOver }){
    
    // a state for a component to re render
   const [render, setRender] = useState(false)
    //

    
    const renderAnswers = answers.map(answer => {
    
    return (
    <p
    className={gameOver===false && answer.isSelected?"giveGrayBackgroundColor":
    gameOver === true && answer.isCorrect === false && answer.isSelected? "giveRedBackground":
    gameOver === true && answer.isCorrect === true  && answer.isSelected? "givegreenBackground":
    gameOver === true && answer.isCorrect === true  && !answer.isSelected? "giveYellowBackgroundColor":
    undefined}
    onClick={()=>{
        handleAnswer(answer, question)
        setRender(prevValue => !prevValue)
        }
    } 
    key={answer.name}>
    {answer.name}
    </p>)
    })

     
    
  
    return <div className="quiz-div__answers-div">
                <h4>{question}</h4> 
                <div>{renderAnswers}</div>
            </div>
}


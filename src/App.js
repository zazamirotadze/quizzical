import React from "react"
import QuizPage from "./QuizPage"

export default function App(){
    const [startQuiz, setStartQuiz] = React.useState(false)
  
    return  <div>{startQuiz? <QuizPage startQuiz={startQuiz} />:
                <div className="start-div">
                    <h1>Quizzical</h1>
                    <button onClick={()=>setStartQuiz(true)} >Start quiz</button>
                </div>
             }</div>
}
import React, { useState,useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
       setTimeRemaining((prevTime) => {
         if (prevTime === 1){
          onAnswered(false); // the question becomes incorrect once the time runs out before the user submits
           return 10; //reseting the timer for next question
         } 
         return prevTime - 1;
       });
      }, 1000);

      return () => clearInterval(timer);
  }, [onAnswered]);

  useEffect(() => {
    setTimeRemaining(10); // Reset the timer when the question changes
  }, [question]);

 

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

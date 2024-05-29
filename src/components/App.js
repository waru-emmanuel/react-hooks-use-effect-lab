import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestion((currentQuestionId) => currentQuestionId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore((score) => score + 1);
    }
  }

  function updateQuestions() {
    const newQuestions = [/* new questions */];
    setQuestions(newQuestions);
    setCurrentQuestion(1);
    setScore(0);
  }

  function restartQuiz() {
    updateQuestions();
    setQuestions(quiz);  // Reset questions to the original quiz data
    setCurrentQuestion(1);  // Reset to the first question
    setScore(0);  // Reset the score
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
            <button onClick={restartQuiz}>Restart</button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;

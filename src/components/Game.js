import React, { useState, useEffect } from 'react';
import QuestionContainer from './QuestionContainer';
import Timer from './Timer';
import ChoiceList from './ChoiceList';
import GameResults from './GameResults';

const Game = props => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState(['a', 'b', 'c', 'd']);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0);
  const [timer, setTimer] = useState(100);
  
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  
  const evaluateInput = userInput => {
    if (firstFactor * secondFactor === userInput) {
      setIsCorrect(true);
      setCurrentScore(score => score + 10);
    } else {
      setIsCorrect(false)
    }
    setIsPending(true);
  }

  const runTimer = () => {
    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - 3);
      interval = setInterval(() => {
        setTimer(timer => timer - 3);
      }, 500);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }

  const addTime = () => {
    setIsTimerActive(false);
    if (timer <= 90) {
      setTimer(timer => timer + 10);
    } else {
      setTimer(100);
    }
  }

  const getNewQuestion = () => {
    const first = Math.floor(Math.random() * 12) + 1;
    const second = Math.floor(Math.random() * 12) + 1;
    const correctAnswer = first * second;
    setFirstFactor(first);
    setSecondFactor(second);
    
    const getNewChoices = () => {
      const generateRandomAnswers = () => {
        const min = correctAnswer - 10 > 0 ? correctAnswer - 10 : 0; // ensures that min is not a negative integer
        const max = correctAnswer + 10;
        const range = Array.from({length:max-min+1},(v,k)=>k+min);

        let randomAnswers = [];
        for (let i = 0; i < 4; i++) {
          const randomValueFromRange = range.splice(Math.floor(Math.random() * range.length), 1)[0];
          randomAnswers.push(randomValueFromRange);
        }
        return randomAnswers
      }

      const newChoices = generateRandomAnswers();
      const correctAnswerInNewChoices = newChoices.some(choice => choice === correctAnswer);
      if (correctAnswerInNewChoices) {
        setChoices(newChoices)
      } else {
        const randomIndex = Math.floor(Math.random() * newChoices.length);
        newChoices[randomIndex] = correctAnswer // insert correct answer in set of choices
        setChoices(newChoices)
      }
    }
    getNewChoices()
  }

  useEffect(getNewQuestion, []);

  useEffect(runTimer, [isTimerActive]);

  useEffect(() => {
    if (timer < 0) {
      setIsCorrect(false);
      setIsPending(true);
    }
  }, [timer]);

  useEffect(() => {
    if (isPending && isCorrect) {
      // proceeds to next question
      addTime();
      const renderNextQuestion = () => {
        setIsPending(false);
        setIsCorrect(false);
        setIsTimerActive(true);
        getNewQuestion();
      }
      setTimeout(renderNextQuestion, 1000);
    } else if (isPending && !isCorrect) {
      // ends quiz and shows results
      setIsTimerActive(false);
      setTimeout(() => {
        setShowResults(true);
      }, 1000)
    }
  }, [isPending, isCorrect])

  useEffect(() => {
    let newHighScore = null;
    if (currentScore > highScore) {
      newHighScore = currentScore;
      setHighScore(newHighScore);
    }
    return () => localStorage.setItem('highScore', newHighScore || highScore)
  }, [currentScore, highScore])

  return (
    <React.Fragment>
      { showResults ?
        <GameResults 
          highScore={ highScore } 
          setIsGameActive={ props.setIsGameActive }
        />
        :
        <div>
          <div style={{ color: 'white' }}>{ `Current Score: ${currentScore}` }</div>
          <div style={{ color: 'white' }}>{ `High Score: ${highScore}` }</div>

          <QuestionContainer 
            firstFactor={ firstFactor } 
            secondFactor={ secondFactor } 
            isCorrect={ isCorrect } 
            isPending={ isPending }
          />

          <Timer 
            timer={ timer }
            isCorrect={ isCorrect } 
            isPending={ isPending }
          />

          <ChoiceList 
            choices={ choices } 
            isCorrect={ isCorrect }
            isPending={ isPending }
            correctAnswer={ firstFactor * secondFactor }
            evaluateInput={ evaluateInput }
          />
        </div> 
      }
    </React.Fragment>
  )
}

export default Game
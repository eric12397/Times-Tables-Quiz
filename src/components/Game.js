import React, { useState, useEffect } from 'react';
import QuestionContainer from './QuestionContainer';
import Timer from './Timer';
import ChoiceList from './ChoiceList';
import GameResults from './GameResults';
import useInterval from '../hooks/useInterval';
import formatTime from '../formatTime';

const Game = props => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [timer, setTimer] = useState(100);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const [timePerQuestion, setTimePerQuestion] = useState([]);
  const [prevTime, setPrevTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useInterval(
    () => {
      let prev = prevTime ? prevTime : Date.now();
      let diffTime = Date.now() - prev;
      let newMilliTime = timeElapsed + diffTime;
      setPrevTime(Date.now());
      setTimeElapsed(newMilliTime);
    },
    isTimerActive ? 10 : null
  );

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
      setTimer(timer => timer - 1);
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 100);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }

  const resetStopwatch = () => {
    setPrevTime(null);
    setTimeElapsed(0);
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
      setQuestionsAnswered(number => number + 1);
      setTimePerQuestion(times => [...times, timeElapsed ])

      const addTime = () => {
        setIsTimerActive(false);
        if (timer <= 90) {
          setTimer(timer => timer + 10);
        } else {
          setTimer(100);
        }
      }
      addTime();

      const renderNextQuestion = () => {
        resetStopwatch();
        setIsPending(false);
        setIsCorrect(false);
        setIsTimerActive(true);
        getNewQuestion();
      }
      setTimeout(renderNextQuestion, 700);

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
          questionsAnswered={ questionsAnswered }
          timePerQuestion={ timePerQuestion }
          setIsGameActive={ props.setIsGameActive }
        />
        :
        <div>
          <div style={{ color: 'white' }}>{ `Current Score: ${currentScore}` }</div>
          <div style={{ color: 'white' }}>{ `High Score: ${highScore}` }</div>
          <div style={{ color: 'white' }}>{ `Questions Answered: ${questionsAnswered}` }</div>

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
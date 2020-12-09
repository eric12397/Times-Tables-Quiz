import React, { useState, useEffect } from 'react';
import './Game.css';
import QuestionContainer from './QuestionContainer';
import Timer from './Timer';
import ChoiceList from './ChoiceList';
import GameResults from './GameResults';
import Fade from './Fade';
import useInterval from '../hooks/useInterval';

const Game = props => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0);
  const [increment, setIncrement] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
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
    } else {
      setIsCorrect(false)
    }
    setIsAnswered(true);
    setIsPending(true);
  }

  const runTimer = () => {
    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - 1);
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 300);
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
    if (isAnswered && timer <= 95) {
      setTimer(prevTime => prevTime + 5);
    } else if (isAnswered && timer > 95) {
      setTimer(100);
    } else if (timer < 0) {
      setIsTimerActive(false);
      setTimeout(() => setShowResults(true), 1000);
    }
  }, [isAnswered, timer])

  useEffect(() => {
    if (isAnswered && isCorrect && timeElapsed <= 1000) {
      setIncrement('+100');
      setCurrentScore(score => score + 100);

    } else if (isAnswered && isCorrect && timeElapsed <= 2000) {
      setIncrement('+50');
      setCurrentScore(score => score + 50);

    } else if (isAnswered && isCorrect && timeElapsed <= 3000) {
      setIncrement('+25');
      setCurrentScore(score => score + 25);

    } else if (isAnswered && isCorrect && timeElapsed > 3000) {
      setIncrement('+10');
      setCurrentScore(score => score + 10);
    } 
  }, [isAnswered, isCorrect, increment, timeElapsed])

  useEffect(() => {
    if (isPending && isAnswered && isCorrect) {
      // proceeds to next question
      setIsTimerActive(false);
      setIsAnswered(false);
      setQuestionsAnswered(number => number + 1);
      setTimePerQuestion(times => [ ...times, timeElapsed ]);
      
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
      setTimeout(() => setShowResults(true), 1000);
    }
  }, [isPending, isCorrect, isAnswered, timeElapsed])

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
        <div className="game-board">

          <div className="game-ui-wrapper">
            <div className="left">
              <div className="game-ui">{ `Current Score: ${currentScore}` }</div>
              <div className="game-ui">{ `High Score: ${highScore}` }</div>
            </div>

            <div className="center">
              <Fade in={ isPending }>
                <p className="fade correct">{ increment }</p>
              </Fade>
            </div>

            <div className="right">
              <div className="game-ui">{ `Questions Answered: ${questionsAnswered}` }</div>
            </div>
          </div>

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
import React, { useState, useEffect } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import QuestionContainer from './QuestionContainer';
import Timer from './Timer';
import ChoiceList from './ChoiceList';
import QuizResults from './QuizResults';
import useInterval from '../hooks/useInterval';
import formatTime from '../formatTime'

const Quiz = ({ 
  selectedTimesTables, 
  questionLimit, 
  timeLimit, 
  backToMenu, 
  isQuizActive, 
  setIsQuizActive 
}) => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState([]);
  const [userAnswer, setUserAnswer] = useState(0);
  const [results, setResults] = useState([]);

  const [questionCount, setQuestionCount] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [timer, setTimer] = useState(100);
  const [isTimerActive, setIsTimerActive] = useState(true);

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
      setNumCorrect(number => number + 1);
      setIsCorrect(true);
    } else {
      setNumIncorrect(number => number + 1);
      setIsCorrect(false)
    }
    
    setUserAnswer(userInput);
    setIsAnswered(true);
  }

  const recordResults = () => {
    const newResult = {
      questionCount, 
      firstFactor, 
      secondFactor, 
      correctAnswer: firstFactor * secondFactor, 
      userAnswer,
      timeElapsed: timeElapsed
    };
    setResults(prevResults => [ ...prevResults, newResult ]);
  }

  const runTimer = () => {
    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - 1);
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, timeLimit/100);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }

  const resetTimer = () => {
    setIsTimerActive(false); 
    setTimer(100);
  }

  const resetStopwatch = () => {
    setPrevTime(null);
    setTimeElapsed(0);
  }

  const getNewQuestion = () => {
    const index = Math.floor(Math.random() * selectedTimesTables.length);
    const first = selectedTimesTables[index];
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

  useEffect(getNewQuestion, [selectedTimesTables]);

  useEffect(runTimer, [isTimerActive, timeLimit]);

  useEffect(() => {
    if (isAnswered) {
      setIsPending(true);
    } 
  }, [isAnswered]);

  useEffect(() => {
    if (timer < 0) {
      setTimeElapsed(timeLimit);
      setIsPending(true);
    }
  }, [timer, timeLimit]);

  useEffect(() => {
    if (isPending && questionCount < questionLimit) {
      // proceeds to next question
      recordResults();
      resetTimer();

      const renderNextQuestion = () => {
        resetStopwatch();
        setIsPending(false);
        setIsCorrect(false);
        setIsAnswered(false);
        setQuestionCount(count => count + 1);
        setIsTimerActive(true);
        getNewQuestion();
      }
      setTimeout(renderNextQuestion, 1000);
    } else if (isPending && questionCount === questionLimit) {
      // ends quiz and shows results
      recordResults();
      resetTimer();

      setTimeout(() => {      
        setIsTimerActive(false);
        setShowResults(true);
      }, 1000)
    }
  }, [isPending, questionCount, questionLimit])

  return (
    <React.Fragment>
      { showResults ?
        <QuizResults 
          backToMenu={ backToMenu } 
          score={ numCorrect / questionLimit * 100 }
          results={ results }
        /> 
        :
        <div>
          <RiArrowGoBackLine onClick={ backToMenu } style={{ color: '#4da9f2' }}/>
          
          <div style={{ color: 'white' }}>{ `Question: ${questionCount}/${questionLimit}` }</div>
          <div style={{ color: 'white' }}>{ `Correct: ${numCorrect}` }</div>
          <div style={{ color: 'white' }}>{ `Incorrect: ${numIncorrect}` }</div>
          <div style={{ color: 'white' }}>{ `Time Remaining: ${formatTime(timeElapsed).seconds}:${formatTime(timeElapsed).milliseconds}` }</div>

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

export default Quiz
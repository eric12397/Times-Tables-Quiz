import './Quiz.css';
import React, { useState, useEffect } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import QuestionContainer from './QuestionContainer';
import Timer from './Timer';
import ChoiceList from './ChoiceList';
import Results from './Results';

const Quiz = ({ 
  selectedTimesTables, 
  questionLimit, 
  difficulty, 
  backToMenu, 
  isQuizActive, 
  setIsQuizActive 
}) => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState(['a', 'b', 'c', 'd']);
  const [userAnswer, setUserAnswer] = useState(null);
  const [results, setResults] = useState([]);

  const [questionCount, setQuestionCount] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [timer, setTimer] = useState(100);
  
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  
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

  const getDecrement = () => {
    let decrement = null;
    if (difficulty === 'beginner') {
      decrement = 10; // 10 secs per question
    } else if (difficulty === 'intermediate') {
      decrement = 20; // 5 secs per question
    } else {
      decrement = 50 // 2 secs per question
    }
    return decrement
  }

  const runTimer = () => {
    const decrement = getDecrement();
    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - decrement);
      interval = setInterval(() => {
        setTimer(timer => timer - decrement);
      }, 1000);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimer(100);
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

  useEffect(runTimer, [isTimerActive, difficulty]);

  useEffect(() => {
    if (isAnswered) {
      setIsPending(true);
    } 
  }, [isAnswered]);

  useEffect(() => {
    if (timer < 0) {
      setIsPending(true);
      setNumIncorrect(number => number + 1);
    }
  }, [timer]);

  useEffect(() => {
    if (isPending && questionCount < questionLimit) {
      // proceeds to next question
      const newResult = {
        questionCount,
        firstFactor, 
        secondFactor,
        correctAnswer: firstFactor * secondFactor,
        userAnswer
      };
      setResults(prevResults => [ ...prevResults, newResult ]);
      resetTimer();
      const renderNextQuestion = () => {
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
      const newResult = {
        questionCount,
        firstFactor, 
        secondFactor,
        correctAnswer: firstFactor * secondFactor,
        userAnswer
      };
      setResults(prevResults => [ ...prevResults, newResult ]);
      resetTimer();
      setTimeout(() => {
        setIsTimerActive(false);
        setShowResults(true);
      }, 1000)
    }
  }, [isPending, questionCount, questionLimit, firstFactor, secondFactor, userAnswer])

  return (
    <React.Fragment>
      { showResults ?
        <Results 
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
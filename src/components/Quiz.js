import React, { useState, useEffect } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Question from './Question';
import Timer from './Timer';
import ChoiceList from './ChoiceList';

const Quiz = ({ selectedTimesTables, difficulty, backToMenu }) => {
  const [firstFactor, setFirstFactor] = useState(null);
  const [secondFactor, setSecondFactor] = useState(null);
  const [choices, setChoices] = useState(['a', 'b', 'c', 'd'])
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timer, setTimer] = useState(100);

  const timeRanOut = () => {
    if (timer < 0) {
      incorrect();
    }
  }

  useEffect(timeRanOut);

  const subtractTime = () => {
    let subtractBy = null;
    if (difficulty === 'beginner') {
      subtractBy = 5;
    } else if (difficulty === 'intermediate') {
      subtractBy = 10;
    } else {
      subtractBy = 33.33;
    }

    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - subtractBy);
      interval = setInterval(() => {
        setTimer(timer => timer - subtractBy);
      }, 1000);
    } 
  
    return () => clearInterval(interval);
  }

  useEffect(subtractTime, [isTimerActive]);

  const correct = () => {
    setIsCorrect(true);
    setTimer(100);
    setTimeout(getNewQuestion, 1000);
  }

  const incorrect = () => {
    setIsCorrect(false);
    setTimer(100);
    setTimeout(getNewQuestion, 1000);
  }

  const evaluateInput = userInput => {
    setIsAnswered(true);
    setIsTimerActive(false);
    if (firstFactor * secondFactor === userInput) {
      correct()
    } else {
      incorrect()
    }
  }

  const getNewQuestion = () => { 
    setIsAnswered(false);
    setIsCorrect(false);
    setIsTimerActive(true);

    const index = Math.floor(Math.random() * selectedTimesTables.length);
    const first = selectedTimesTables[index];
    const second = Math.floor(Math.random() * 12) + 1;
    setFirstFactor(first);
    setSecondFactor(second);
    const correctAnswer = first * second;

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
  
  return (
    <div>
      <RiArrowGoBackLine onClick={ backToMenu } style={{ color: '#4da9f2' }}/>
      
      <Question 
        firstFactor={ firstFactor } 
        secondFactor={ secondFactor } 
        isAnswered={ isAnswered }
      />

      <Timer 
        timer={ timer }
        isCorrect={ isCorrect } 
      />

      <ChoiceList 
        choices={ choices } 
        isCorrect={ isCorrect }
        isAnswered={ isAnswered }
        correctAnswer={ firstFactor * secondFactor }
        evaluateInput={ evaluateInput }/>
    </div>
  )
}

export default Quiz
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
  const [questionCount, setQuestionCount] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [resultMsg, setResultMsg] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(100);

  const correct = () => {
    setIsCorrect(true);
    setCorrectQuestions(correctQuestions => correctQuestions + 1)
    setResultMsg('Correct');
    setTimeout(getNewQuestion, 1000);
  }

  const incorrect = () => {
    setIsCorrect(false);
    setIncorrectQuestions(incorrectQuestions => incorrectQuestions + 1)
    setResultMsg('Incorrect');
    setTimeout(getNewQuestion, 1000);
  }

  const evaluateInput = userInput => {
    if (firstFactor * secondFactor === userInput) {
      correct()
    } else {
      incorrect()
    }
    setIsAnswered(true);
    setIsTimerActive(false);
    setTimer(100);
  }

  const resetQuiz = () => {
    setIsAnswered(false);
    setIsCorrect(false);
    setIsTimerActive(true);
    setResultMsg(null);
    setQuestionCount(questionCount => questionCount + 1);
  }

  const subtractTime = () => {
    let subtractBy = null;
    if (difficulty === 'beginner') {
      subtractBy = 5;
    } else if (difficulty === 'intermediate') {
      subtractBy = 10;
    } else {
      subtractBy = 50//33.33;
    }

    let interval = null;
    if (isTimerActive) {
      setTimer(timer => timer - subtractBy);
      interval = setInterval(() => {
        setTimer(timer => timer - subtractBy);
      }, 1000);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      console.log('QUIZ UNMOUNTED')
    }
  }
  
  const getNewQuestion = () => { 
    resetQuiz();
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

  useEffect(getNewQuestion, [selectedTimesTables]);
  useEffect(subtractTime, [isTimerActive, difficulty]);
  useEffect(() => {
    if (questionCount > questionLimit) {
      console.log('FINISHED');
      setShowResults(true);
      setIsTimerActive(false);
    }
  }, [questionCount, questionLimit]);

  useEffect(() => {
    if (timer < 0) {
      incorrect();
      setTimer(100);
    }
  }, [timer]);
  
  return (
    <React.Fragment>
      { showResults ?
        <Results 
          backToMenu={ backToMenu } 
          correctQuestions={ correctQuestions }
          incorrectQuestions={ incorrectQuestions }
        /> :
        <div>
          <RiArrowGoBackLine onClick={ backToMenu } style={{ color: '#4da9f2' }}/>
          
          <div className="result">{ resultMsg }</div>
          <div style={{ color: 'white' }}>{ `${questionCount}/${questionLimit}` }</div>

          <QuestionContainer 
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
            evaluateInput={ evaluateInput }
          />
        </div> 
      }
    </React.Fragment>
  )
}

export default Quiz
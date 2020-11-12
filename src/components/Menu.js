import React, { useState } from 'react';
import TimesTableList from './TimesTableList';
import Quiz from './Quiz';

const Menu = () => {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [questionLimit, setQuestionLimit] = useState(0);
  const [timesTables, setTimesTables] = useState([
    { value: 1, isSelected: false },
    { value: 2, isSelected: false },
    { value: 3, isSelected: false },
    { value: 4, isSelected: false },
    { value: 5, isSelected: false },
    { value: 6, isSelected: false },
    { value: 7, isSelected: false },
    { value: 8, isSelected: false },
    { value: 9, isSelected: false },
    { value: 10, isSelected: false },
    { value: 11, isSelected: false },
    { value: 12, isSelected: false }
  ])
  const selectedTimesTables = timesTables
                                .filter(item => item.isSelected === true) 
                                .map(item => item.value)

  const selectItem = value => {
    setTimesTables(
      timesTables.map(item => 
        item.value === value 
        ? { ...item, isSelected: !item.isSelected } 
        : item
      )
    )
  }

  const selectAll = () => {
    const allTimesTablesSelected = timesTables.every(item => item.isSelected === true);
    if (allTimesTablesSelected) {
      setTimesTables(
        timesTables.map(item => ({ ...item, isSelected: false }))
      )
    } else {
      setTimesTables(
        timesTables.map(item => ({ ...item, isSelected: true }))
      )
    }
  }

  const startQuiz = () => {
    const atLeastOneTimesTableSelected = timesTables.some(item => item.isSelected === true);
    if (atLeastOneTimesTableSelected && difficulty && questionLimit !== 0) {
      setIsQuizActive(true);
    } else {
      console.log('You must select at least one times table and difficuty.')
    }
  }

  const backToMenu = () => {
    setIsQuizActive(false);
    setDifficulty(null);
    setQuestionLimit(0);
    setTimesTables(
      timesTables.map(item => ({ ...item, isSelected: false }))
    )
  }

  return (
    <React.Fragment>
      { isQuizActive ? 
        <Quiz 
          selectedTimesTables={ selectedTimesTables } 
         questionLimit={ questionLimit }
          difficulty={ difficulty } 
          backToMenu={ backToMenu }
          isQuizActive={ isQuizActive }
          setIsQuizActive={ setIsQuizActive }
        /> : 
        <TimesTableList 
          timesTables={ timesTables } 
          selectItem={ selectItem }
          selectAll={ selectAll } 
          setDifficulty={ setDifficulty }
          setQuestionLimit={ setQuestionLimit }
          startQuiz={ startQuiz }
        /> 
      }
    </React.Fragment>
  )
}

export default Menu
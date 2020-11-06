import './MenuContainer.css';
import React, { useState, useEffect } from 'react';
import TimesTableList from './TimesTableList';
import Quiz from './Quiz';


const MenuContainer = () => {
  const [start, setStart] = useState(false)
  const [difficulty, setDifficulty] = useState(null);
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
    if (atLeastOneTimesTableSelected && difficulty) {
      setStart(true);
    } else {
      console.log('You must select at least one times table and difficuty.')
    }
  }

  const backToMenu = () => {
    setStart(false);
    setDifficulty(null);
  }

  return (
    <div className="menu-container">
      <div className="menu-content">
        { start ? 
          <Quiz 
            selectedTimesTables={ selectedTimesTables } 
            difficulty={ difficulty } 
            backToMenu={ backToMenu }
          /> : 
          <TimesTableList 
            timesTables={ timesTables } 
            selectItem={ selectItem }
            selectAll={ selectAll } 
            setDifficulty={ setDifficulty }
            startQuiz={ startQuiz }
          /> 
          }
      </div>
    </div>
  )
}

export default MenuContainer
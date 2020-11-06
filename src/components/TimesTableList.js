import './TimesTableList.css';
import React, { useState } from 'react';
import Button from './Button';
import DifficultySettings from './DifficultySettings';

const TimesTableList = props => {
  const handleClick = event => {
    props.selectItem(parseInt(event.target.innerText))
  }

  return (
    <React.Fragment>
      <div className="times-table-grid">
        { props.timesTables.map(item => (
          <div 
            key={ item.value }
            className={`item ${ item.isSelected ? 'item-selected' : '' }`} 
            onClick={ handleClick }
          >
            { item.value }
          </div>
        ))}
      </div>

      <div className="settings-wrapper">
        <div className='settings'>
          <Button onClick={ props.startQuiz }>Start</Button>
        </div>

        <div className='settings'>
          <Button onClick={ props.selectAll }>Select All</Button>
        </div>

        <div className='settings'>
          <DifficultySettings setDifficulty={ props.setDifficulty } />
        </div> 
      </div>
    </React.Fragment>
  )
}

export default TimesTableList
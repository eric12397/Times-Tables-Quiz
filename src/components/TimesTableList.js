import './TimesTableList.css';
import React from 'react';
import Button from './Button';
import DifficultySettings from './DifficultySettings';
import QuestionLimit from './QuestionLimit';

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
          <Button onClick={ props.startQuiz }>Practice</Button>
        </div>

        <div className='settings'>
          <Button onClick={ props.selectAll }>Select All</Button>
        </div>

        <div className='settings'>
          <DifficultySettings setDifficulty={ props.setDifficulty } />
        </div> 

        <div className='settings'>
          <QuestionLimit setQuestionLimit={ props.setQuestionLimit }/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimesTableList
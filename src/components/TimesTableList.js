import './TimesTableList.css';
import React from 'react';
import Button from './Button';
import DifficultySettings from './DifficultySettings';
import QuestionLimit from './QuestionLimit';
import { useHistory } from 'react-router-dom';

const TimesTableList = props => {
  const history = useHistory();

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

      <div className="options-wrapper">
        <div className='options'>
          <Button onClick={ props.startQuiz } color='primary'>Practice</Button>
        </div>

        <div className='options'>
          <Button onClick={ props.selectAll } color='primary'>Select All</Button>
        </div>

        <div className='options'>
          <DifficultySettings setDifficulty={ props.setDifficulty } />
        </div> 

        <div className='options'>
          <QuestionLimit setQuestionLimit={ props.setQuestionLimit }/>
        </div>

        <div className='options'>
          <Button onClick={ () => history.push('./game') } color='secondary'>Times Table Trials</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimesTableList
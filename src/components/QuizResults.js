import './Results.css';
import React from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BiCheckCircle } from 'react-icons/bi';
import { VscError } from 'react-icons/vsc';

const QuizResults = props => {

  return (
    <React.Fragment>
      <RiArrowGoBackLine onClick={ props.backToMenu } style={{ color: '#4da9f2' }}/>
      <h2 className="score">You scored { props.score }%</h2>
      <table className="results-table">
        <tr>
          <th></th>
          <th>Question</th>
          <th>Correct Answer</th>
          <th>Your Answer</th>
        </tr>
      { props.results.map(result => (
        <tr>
          <td>{ result.questionCount }.</td>
          <td>{ result.firstFactor } x { result.secondFactor }</td>
          <td>{ result.correctAnswer }</td>
          <td>{ result.userAnswer ? result.userAnswer : 'N/A' }</td>
          <td>
            { result.correctAnswer === result.userAnswer 
              ? <BiCheckCircle className="correct" /> 
              : <VscError className="incorrect" /> 
            }
          </td>
        </tr>
        ))}
      </table>
    </React.Fragment>
   )
}

export default QuizResults
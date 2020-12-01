import './Results.css';
import React from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BiCheckCircle } from 'react-icons/bi';
import { VscError } from 'react-icons/vsc';
import formatTime from '../formatTime'

const QuizResults = props => {

  let sum = 0;
  for (let i=0; i<props.results.length; i++) {
    sum += props.results[i].timeElapsed;
  }
  const avg = formatTime(sum / props.results.length)

  return (
    <div>
      <RiArrowGoBackLine onClick={ props.backToMenu } style={{ color: '#4da9f2' }}/>
      <h2 className="score">You scored { props.score }%</h2>
      <h2 className="score">Average Time per Question: { avg.seconds }.{ avg.milliseconds } secs</h2>
      <table className="results-table">
        <tr>
          <th></th>
          <th>Question</th>
          <th>Time (secs)</th>
          <th>Correct Answer</th>
          <th>Your Answer</th>
        </tr>
      { props.results.map(result => {
        const timeElapsed = formatTime(result.timeElapsed);
        return (
          <tr>
            <td>{ result.questionCount }.</td>
            <td>{ result.firstFactor } x { result.secondFactor }</td>
            <td>{ timeElapsed.seconds }.{ timeElapsed.milliseconds }</td>
            <td>{ result.correctAnswer }</td>
            <td>{ result.userAnswer ? result.userAnswer : 'N/A' }</td>
            <td>
              { result.correctAnswer === result.userAnswer 
                ? <BiCheckCircle className="correct" /> 
                : <VscError className="incorrect" /> 
              }
            </td>
          </tr> )
        }
      )}
      </table>
    </div>
   )
}

export default QuizResults
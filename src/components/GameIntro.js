import './GameIntro.css';
import React, { useState } from 'react';
import Game from './Game';
import Button from './Button';
import { useHistory } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';

const GameIntro = () => {
  const history = useHistory();
  const [isGameActive, setIsGameActive] = useState(false);
  return (
    <React.Fragment>
      <RiArrowGoBackLine onClick={ () => history.push('/') } style={{ color: '#4da9f2' }}/>
      { isGameActive ? 
        <Game setIsGameActive={ setIsGameActive }/> : 

        <div className="intro-container">
          <p className="intro-message">
          Welcome to Times Table Trials! 
          Race against the clock to show off your multiplication skills to players around the world. 
          Answer questions correctly to add more time. The faster you answer, the more points you score!  
          </p>

          <div className="options-wrapper">
            <div className="options">
              <Button onClick={ () => setIsGameActive(true) } color='primary'>Begin</Button>
            </div>
            <div className="options">
              <Button onClick={ () => console.log('leaderboard') } color='primary'>View Leaderboard</Button>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default GameIntro
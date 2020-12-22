import './MenuContainer.css';
import React from 'react';
import Menu from './Menu';
import GameIntro from './GameIntro';
import Leaderboard from './Leaderboard';
import { Route, Switch } from 'react-router-dom';

const MenuContainer = () => {
  return (
    <div className="menu-flex">
      <div className="menu-content">
        <Switch>
          <Route exact path="/leaderboard" component={ Leaderboard }/>
          <Route exact path="/game" component={ GameIntro } />
          <Route exact path="/" component={ Menu } />
        </Switch>
      </div>
    </div>
  )
}

export default MenuContainer
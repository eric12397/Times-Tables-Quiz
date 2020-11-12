import './MenuContainer.css';
import React from 'react';
import Menu from './Menu';
import GameIntro from './GameIntro';
import { Route, Switch } from 'react-router-dom';

const MenuContainer = () => {
  return (
    <div className="menu-container">
      <div className="menu-content">
        <Switch>
          <Route exact path="/leaderboard" />
          <Route exact path="/game" component={ GameIntro } />
          <Route exact path="/" component={ Menu } />
        </Switch>
      </div>
    </div>
  )
}

export default MenuContainer
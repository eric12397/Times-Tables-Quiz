import './App.css';
import React, { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import MenuContainer from './components/MenuContainer';
import Navbar from './components/Navbar';
import store from './redux/store';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={ store }>
      <Router>
        <Navbar />
        <MenuContainer />
      </Router>
    </Provider>
  );
}

export default App;


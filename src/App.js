import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import MenuContainer from './components/MenuContainer';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <MenuContainer />
    </Router>
  );
}

export default App;


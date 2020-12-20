import React from 'react';
import './Fade.css';
import { CSSTransition } from 'react-transition-group';


const Fade = props => {
  return (
    <CSSTransition {...props} timeout={300} classNames="fade">
      { props.children }
    </CSSTransition>
  )
}

export default Fade
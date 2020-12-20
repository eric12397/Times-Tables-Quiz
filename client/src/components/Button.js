import React from 'react';
import './Button.css';

const Button = ({ type = "button", color, handleClick, children }) => {

  return (
    <button type={ type } className={ `btn ${color}` } onClick={ handleClick }>
      { children }
    </button>
  )
}



export default Button
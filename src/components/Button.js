import React from 'react';
import './Button.css';

const Button = props => {
  const handleClick = () => {
    props.onClick()
  }

  return (
    <button className={ `btn ${props.color}` } onClick={ handleClick }>
      { props.children }
    </button>
  )
}



export default Button
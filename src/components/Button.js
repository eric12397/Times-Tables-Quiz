import React from 'react';
import './Button.css';

const Button = props => {
  const handleClick = () => {
    props.onClick()
  }

  return (
    <button className="btn" onClick={ handleClick }>
      { props.children }
    </button>
  )
}

export default Button
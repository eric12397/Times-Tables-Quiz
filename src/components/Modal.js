import React from 'react';
import './Modal.css';

const Modal = props => {
  return (
    props.isOpen ? 
    <div className="modal-wrapper">
      <div className="modal-backdrop" onClick={ props.toggle }/>
      <div className="modal-content">
        <p onClick={ props.toggle }>X</p>
        { props.children }
      </div>
    </div> : null
  )
}

export default Modal
import '../app.css';

import React from 'react';
import Modal from 'react-modal';

// Modal Styles
const customStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '30vh',
    left: '37.5vw',
    right: '37.5vw',
    bottom: '40vh',
    border: '1px solid #ccc',
    borderRadius: '5px',
    background: '#787A7A',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',

  },
};

const Logout = (props) => {
  const { open, close, logout } = { ...props };
  return (
    <Modal
      isOpen={open}
      style={customStyle}
      contentLabel="Modal"
    >
      <h1>Logout?</h1>
      <button type="button" className="close-button" onClick={close}>No</button>
      <button type="button" className="logout-button" onClick={logout}>Yes</button>
    </Modal>
  );
};

export default Logout;

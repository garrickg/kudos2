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

const AddTimerModal = (props) => {
  const { open, close, addTimer } = { ...props };
  return (
    <Modal
      isOpen={open}
      style={customStyle}
      contentLabel="Modal"
    >
      <form onSubmit={addTimer}>
        <label>
          Timer Description
          <input
            name="description"
            type="text"
            style={{ color: 'black' }}
          />
        </label>
        <label>
          Timer Duration
          <input
            name="duration"
            type="number"
            style={{ color: 'black' }}
          />
        </label>
        <button type="submit" style={{ color: 'black' }}>OK</button>
        <button type="button" onClick={close} style={{ color: 'black' }}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddTimerModal;

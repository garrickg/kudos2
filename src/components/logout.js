import React, { Component } from 'react';
import '../App.css';
import Modal from 'react-modal';

// Modal Styles
const customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40vh',
    left                       : '37.5vw',
    right                      : '37.5vw',
    bottom                     : '40vh',
    border                     : '1px solid #ccc',
    borderRadius               : '5px',
    background                 : '#787A7A',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    outline                    : 'none',

  }
};

class Logout extends Component {

    render() {
        // Render logout modal prompt
        return (
            <Modal
                isOpen={this.props.open}
                style={customStyle}
                contentLabel="Modal"
                >
                <h1>Logout?</h1>
                <button className="close-button" onClick={this.props.close}>Close</button>
                <button className="logout-button" onClick={this.props.logout}>Logout</button>
            </Modal>
        );
    }

}

export default Logout;
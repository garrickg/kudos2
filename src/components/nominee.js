import React, { Component } from 'react';
import '../App.css';

class Nominee extends Component {

  render() {
    return (
        <p data-key={this.props.index}>
            {`${this.props.name.First} ${this.props.name.Last}`}
        </p>
    );
  }
}

export default Nominee;

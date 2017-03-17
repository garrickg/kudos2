import React, { Component } from 'react';
import '../App.css';

class Winner extends Component {

  render() {
    return (
        <p className="winner" data-key={this.props.index}>
            {`${this.props.name.First} ${this.props.name.Last}`}
        </p>
    );
  }
}

export default Winner;

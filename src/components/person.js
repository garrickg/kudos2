import React, { Component } from 'react';
import '../App.css';

class Person extends Component {

  render() {
    return (
        <p>
          <a onClick={this.props.nominate} data-key={this.props.name.key}>{`${this.props.name.First} ${this.props.name.Last}`}</a> 
        </p>
    );
  }
}

export default Person;

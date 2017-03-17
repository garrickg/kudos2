import React, { Component } from 'react';
import '../App.css';

class Person extends Component {

  render() {
    if (!this.props.search) {
      return (
        <p className="person">
          <a onClick={this.props.nominate} data-key={this.props.name.key}>{`${this.props.name.First} ${this.props.name.Last}`}</a> 
        </p>
      );
    }
    else {
      return (
        <p style={!this.props.name ? {display: 'none'} : {}}>
          <a onClick={this.props.add} data-key={this.props.index} data-search={this.props.name}>{`Add ${this.props.name}`}</a> 
        </p>
      )
    }
  }
}

export default Person;

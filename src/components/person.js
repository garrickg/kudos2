import React, { Component } from 'react';
import '../App.css';

class Person extends Component {

  render() {
    if (!this.props.search) {
      let fullName = `${this.props.name.First} ${this.props.name.Last}`;
      if (this.props.highlight){
        let regex = new RegExp(this.props.highlight, 'gi');
        fullName = fullName.replace(regex, (match) => {
          return `<span class="hl">${match}</span>`
        });
      }
      return (
        <p className="person">
          <a onClick={this.props.nominate} data-key={this.props.name.key} dangerouslySetInnerHTML={{__html: fullName}}></a> 
        </p>
      );
    }
    else {
      return (
        <p className="add-name" style={!this.props.name ? {display: 'none'} : {}}>
          <a onClick={this.props.add} data-key={this.props.index} data-search={this.props.name}>{`Add ${this.props.name}`}</a> 
        </p>
      )
    }
  }
}

export default Person;

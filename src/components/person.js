import React, { Component } from 'react';
import '../App.css';

class Person extends Component {

  render() {
    // Check if component has received search bool
    if (!this.props.search) {
      // Highlight any search string matches in all names
      let fullName = `${this.props.name.First} ${this.props.name.Last}`;
      if (this.props.highlight){
        let regex = new RegExp(this.props.highlight, 'gi');
        fullName = fullName.replace(regex, (match) => {
          return `<span class="hl">${match}</span>`
        });
      }
      // Render name component
      return (
        <p className="person">
          <a onClick={this.props.nominate} data-key={this.props.name.key} dangerouslySetInnerHTML={{__html: fullName}}></a> 
        </p>
      );
    }
    // If no search results in list, add new component for new name
    else {
      return (
        <p className="add-name">
          <a onClick={this.props.add} data-key={this.props.index} data-search={this.props.name}>{`Add ${this.props.name}`}</a> 
        </p>
      )
    }
  }
}

export default Person;

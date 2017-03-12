import React, { Component } from 'react';
import './App.css';
import base from './base';
import PeopleList from './components/peoplelist';
import NomineeList from './components/nomineelist';

class App extends Component {

  state = {
    people: [],
    filtered: [],
    nominees: [],
    winners: []
  }

  componentWillMount() {
    base.fetch('people', {
      context: this,
      asArray: true,
      then(data){
        this.setState({
          people: data,
          filtered: data
        });
      }
    });
  }

  filter = (e) => {
    const people = [...this.state.people];
    const filtered = people.filter(person => {
      const regex = new RegExp(e.target.value, 'gi');
      return person.First.match(regex) || person.Last.match(regex)
    });
    this.setState({
      filtered
    })
  }

  nominate = (e) => {
    const nominees = [...this.state.nominees];
    nominees.push(this.state.people[e.target.dataset.key])
    this.setState({
      nominees
    });
    document.querySelector('input[type="text"]').value = "";
    this.setState({
      filtered: this.state.people
    });
  }

  render() {
    return (
      <div>
      <form className="search-form">
        <input type="text" className="search" placeholder="Search..." onChange={this.filter} />
        <PeopleList people={this.state.filtered} nominate={this.nominate} />
      </form>
      <NomineeList nominees={this.state.nominees} />
      </div>
    );
  }
}

export default App;

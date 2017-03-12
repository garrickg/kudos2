import React, { Component } from 'react';
import Chance from 'chance';
import './App.css';
import base from './base';
import PeopleList from './components/peoplelist';
import NomineeList from './components/nomineelist';
import WinnerList from './components/winnerlist';

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

  pickWinner = () => {
    let chance = new Chance();
    let nominees = [...this.state.nominees];
    const winners = [...this.state.winners];
    if (nominees.length > 0) {
      const winnerIndex = chance.integer({min:0, max: nominees.length - 1});
      const winnerKey = nominees[winnerIndex].key;
      winners.push(nominees[winnerIndex]);
      nominees = nominees.filter(nominee => nominee.key !== winnerKey);
      this.setState({
        winners,
        nominees
      });
    }
  }

  render() {
    return (
      <div>
      <form className="search-form">
        <input type="text" className="search" placeholder="Search..." onChange={this.filter} />
        <PeopleList people={this.state.filtered} nominate={this.nominate} />
      </form>
      <NomineeList nominees={this.state.nominees} />
      <WinnerList pickWinner={this.pickWinner} winners={this.state.winners} />
      </div>
    );
  }
}

export default App;

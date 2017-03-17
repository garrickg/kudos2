import React, { Component } from 'react';
import Chance from 'chance';
import Moment from 'moment';
import Base from './base';
import './App.css';
import PeopleList from './components/peoplelist';
import NomineeList from './components/nomineelist';
import WinnerList from './components/winnerlist';

class App extends Component {

  // Setting intial state
  state = {
    people: [], // Complete list of people
    search: "", // User entered search string
    filtered: [], // List of people filtered based on search string
    nominees: [], // List of people nominated
    winners: [] // List of winners
  }

  componentWillMount() {

    const today = Moment().format('LL');

    this.peopleRef = Base.syncState(`people`, {
      context: this,
      state: 'people',
      asArray: true,
      then(){
        this.setState({
          filtered: this.state.people
        });
      }
    });

    this.nomineesRef = Base.syncState(`nominees/${today}`, {
      context: this,
      state: 'nominees',
      asArray: true
    });

    this.winnersRef = Base.syncState(`winners/${today}`, {
      context: this,
      state: 'winners',
      asArray: true
    });
  }

  // Removed DB bindings on close
  componentWillUnmount(){
    Base.removeBinding(this.peopleRef);
    Base.removeBinding(this.nomineesRef);
    Base.removeBinding(this.winnersRef);
  }

  filter = (e) => {
    // Get search string
    const search = e.target.value;
    // Copy current list of people from state
    const people = [...this.state.people];
    // Filter list of people base on search string regex
    const filtered = people.filter(person => {
      const regex = new RegExp(search, 'gi');
      return person.First.match(regex) || person.Last.match(regex) || (`${person.First} ${person.Last}`).match(regex)
    });
    this.setState({
      filtered,
      search
    })
  }

  nominate = (e) => {
    // Copy current list of nominees
    const nominees = [...this.state.nominees];
    const nomineeKey = e.target.dataset.key;
    const nominee = {
      First: this.state.people[nomineeKey].First,
      Last: this.state.people[nomineeKey].Last
    }

    // Add clicked name to list of nominees
    nominees.push(nominee);

    this.setState({
      nominees,
      filtered: this.state.people
    });

    // Clear search input box
    document.querySelector('.search-box').value = "";
  }

  pickWinner = () => {
    // Instantiate Chance
    let chance = new Chance();
    // Copy list of nominees and winners
    let nominees = [...this.state.nominees];
    const winners = [...this.state.winners];
    // Check if no nominees
    if (nominees.length > 0) {
      // Pick winner from list of nominees
      const winnerIndex = chance.integer({min:0, max: nominees.length - 1});
      const winner = nominees[winnerIndex]
      // Add winner to winners list
      winners.push(winner);
      // Remove all instances of winner from nominees list
      nominees = nominees.filter(nominee => nominee.First !== winner.First && nominee.Last !== winner.Last);
      this.setState({
        winners,
        nominees
      });
    }
  }

  undo = () => {
    // Copy list of nominees from state
    let nominees = [...this.state.nominees];

    if (nominees.length > 0) {
      nominees.pop();
    }

    this.setState({
      nominees
    });
  }

  add = (e) => {
    // Get first and last name, and create new key/index
    const [first = "", last = ""] = e.target.dataset.search.split(' ');
    const key = e.target.dataset.key;

    const people = [...this.state.people];
    const nominees = [...this.state.nominees];
    const person = {
      First: first,
      Last: last,
      key
    };

    // Add new person to list of people
    people.push(person);
    
    // Nominate new person
    nominees.push(person);

    this.setState({
      people,
      nominees,
      filtered: people
    });

    // Clear search box
    document.querySelector('.search-box').value = "";

  }

  render() {
    return (
      <div>
      <form className="search-form">
        <input type="text" className="search-box" placeholder="Search..." onChange={this.filter} />
        <PeopleList people={this.state.people} filtered={this.state.filtered} nominate={this.nominate} add={this.add} search={this.state.search} />
      </form>
      <NomineeList nominees={this.state.nominees} undo={this.undo} />
      <WinnerList pickWinner={this.pickWinner} winners={this.state.winners} />
      </div>
    );
  }
}

export default App;
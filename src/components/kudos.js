import React, { Component } from 'react';
import Chance from 'chance';
import Moment from 'moment';
import Fuzzy from 'fuzzysearch';
import Base from '../base';
import '../App.css';
import PeopleList from './peoplelist';
import NomineeList from './nomineelist';
import WinnerList from './winnerlist';

class Kudos extends Component {

  // Setting intial state
  state = {
    people: [], // Complete list of people
    search: "", // User entered search string
    filtered: [], // List of people filtered based on search string
    nominees: [], // List of people nominated
    winners: [], // List of winners
    undo: false // Handle if undo button was pressed, for different animations
  }

  componentWillMount() {
    // Format is 'MMM DD, YYYY'
    const today = Moment().format('LL');

    // Sync list of people in DB to App
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

    // Sync list of nominees from today in DB to App
    this.nomineesRef = Base.syncState(`nominees/${today}`, {
      context: this,
      state: 'nominees',
      asArray: true
    });

    // Sync list of winners from today in DB to App
    this.winnersRef = Base.syncState(`winners/${today}`, {
      context: this,
      state: 'winners',
      asArray: true
    });
  }

  // Highlight input box on load for quicker typing
  componentDidMount() {
    let input = document.querySelector('.search-box');
    input.focus();
  }

  // Removed DB bindings on close
  componentWillUnmount() {
    Base.removeBinding(this.peopleRef);
    Base.removeBinding(this.nomineesRef);
    Base.removeBinding(this.winnersRef);
  }

  filter = (e) => {
    e.preventDefault();
    // Get search string
    const search = e.target.value;
    // Copy current list of people from state
    const people = [...this.state.people];
    // Filter list of people based on search string regex
    // const filtered = people.filter(person => {
    //   const regex = new RegExp(search, 'gi');
    //   return person.First.match(regex) || person.Last.match(regex) || (`${person.First} ${person.Last}`).match(regex)
    // });
    // Filter list of people based on fuzzy search
    const filtered = people.filter(person => {
      return Fuzzy(search.toLowerCase(), `${person.First} ${person.Last}`.toLowerCase());
    })
    this.setState({
      filtered,
      search,
      undo: false
    })
  }

  nominate = (e) => {
    // Copy current list of nominees
    const nominees = [...this.state.nominees];
    const nomineeKey = e.target.dataset.key;
    const nominee = {
      First: this.state.people[nomineeKey].First,
      Last: this.state.people[nomineeKey].Last,
      NomKey: nomineeKey,
      index: nominees.length
    }

    // Add clicked name to list of nominees
    nominees.push(nominee);

    this.setState({
      nominees,
      filtered: this.state.people,
      search: "",
      undo: false
    });

    // Clear search input box
    let input = document.querySelector('.search-box');
    input.value = "";
    input.focus();
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
      nominees = nominees.filter(nominee => !(nominee.First === winner.First && nominee.Last === winner.Last));
      this.setState({
        winners,
        nominees,
        undo: false
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
      nominees,
      undo: true
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
    const nominee = {
      First: first,
      Last: last,
      NomKey: key,
      index: nominees.length
    };

    // Add new person to list of people
    people.push(person);
    
    // Nominate new person
    nominees.push(nominee);

    this.setState({
      people,
      nominees,
      filtered: people,
      undo: false
    });

    // Clear search input box
    let input = document.querySelector('.search-box');
    input.value = "";
    input.focus();
  }

  handleDefault = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="search-form" onSubmit={this.handleDefault}>
          <input type="text" className="search-box" placeholder="Search..." onChange={this.filter} />
          <PeopleList people={this.state.people} filtered={this.state.filtered} nominate={this.nominate} add={this.add} search={this.state.search} />
        </form>
        <NomineeList people={this.state.people} nominees={this.state.nominees} undo={this.undo} undoAnimation={this.state.undo} />
        <WinnerList pickWinner={this.pickWinner} winners={this.state.winners} />
      </div>
    );
  }
}

export default Kudos;
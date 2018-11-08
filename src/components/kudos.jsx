import '../App.css';

import Chance from 'chance';
import Fuzzy from 'fuzzysearch';
import Moment from 'moment';
import React, { Component } from 'react';

import Base from '../base';
import NomineeList from './nomineelist';
import PeopleList from './peoplelist';
import WinnerList from './winnerlist';

const SEARCH_BOX = '.search-box';

class Kudos extends Component {
  // Setting intial state
  state = {
    people: [], // Complete list of people
    search: '', // User entered search string
    filtered: [], // List of people filtered based on search string
    nominees: [], // List of people nominated
    winners: [], // List of winners
    undo: false, // Handle if undo button was pressed, for different animations
  }

  componentWillMount() {
    // Format is 'MMM DD, YYYY'
    const today = Moment().format('LL');

    // Sync list of people in DB to App
    this.peopleRef = Base.syncState('people', {
      context: this,
      state: 'people',
      asArray: true,
      then() {
        const { people } = this.state;
        this.setState({
          filtered: people,
        });
      },
    });

    // Sync list of nominees from today in DB to App
    this.nomineesRef = Base.syncState(`nominees/${today}`, {
      context: this,
      state: 'nominees',
      asArray: true,
    });

    // Sync list of winners from today in DB to App
    this.winnersRef = Base.syncState(`winners/${today}`, {
      context: this,
      state: 'winners',
      asArray: true,
    });
  }

  // Highlight input box on load for quicker typing
  componentDidMount() {
    const input = document.querySelector(SEARCH_BOX);
    input.focus();
  }

  filter = (e) => {
    e.preventDefault();
    // Get search string
    const search = e.target.value;
    // Copy current list of people from state
    const { people: peopleArr } = this.state;
    const people = [...peopleArr];
    // Filter list of people based on fuzzy search
    const filtered = people.filter(person => Fuzzy(search.toLowerCase(), `${person.First} ${person.Last}`.toLowerCase()));
    this.setState({
      filtered,
      search,
      undo: false,
    });
  }

  nominate = (e) => {
    // Copy current list of nominees
    const { nominees: nomineesArr, people } = this.state;
    const nominees = [...nomineesArr];
    const nomineeKey = e.target.dataset.key;
    const nomineeIndex = people.findIndex(person => person.key === nomineeKey);
    const nominee = {
      First: people[nomineeIndex].First,
      Last: people[nomineeIndex].Last,
      NomKey: nomineeKey,
      index: nominees.length,
    };

    // Add clicked name to list of nominees
    nominees.push(nominee);

    this.setState({
      nominees,
      filtered: people,
      search: '',
      undo: false,
    });

    // Clear search input box
    const input = document.querySelector(SEARCH_BOX);
    input.value = '';
    input.focus();
  }

  pickWinner = () => {
    // Instantiate Chance
    const chance = new Chance();
    // Copy list of nominees and winners
    const { nominees: nomineesArr, winners: winnersArr } = this.state;
    let nominees = [...nomineesArr];
    const winners = [...winnersArr];
    // Check if no nominees
    if (nominees.length > 0) {
      // Pick winner from list of nominees
      const winnerIndex = chance.integer({ min: 0, max: nominees.length - 1 });
      const winner = nominees[winnerIndex];
      // Add winner to winners list
      winners.push(winner);
      // Remove all instances of winner from nominees list
      nominees = nominees.filter(
        nominee => !(nominee.First === winner.First && nominee.Last === winner.Last),
      );
      this.setState({
        winners,
        nominees,
        undo: false,
      });
    }
  }

  undo = () => {
    // Copy list of nominees from state
    const { nominees: nomineesArr } = this.state;
    const nominees = [...nomineesArr];

    if (nominees.length > 0) {
      nominees.pop();
    }

    // focus on search input box
    const input = document.querySelector(SEARCH_BOX);
    input.focus();

    this.setState({
      nominees,
      undo: true,
    });
  }

  add = (e) => {
    // Get first and last name, and create new key/index
    const [first = '', last = ''] = e.target.dataset.search.split(' ');
    const { key } = e.target.dataset;

    const { people: peopleArr, nominees: nomineesArr } = this.state;
    const people = [...peopleArr];
    const nominees = [...nomineesArr];
    const person = {
      First: first,
      Last: last,
      key,
    };
    const nominee = {
      First: first,
      Last: last,
      NomKey: key,
      index: nominees.length,
    };

    // Add new person to list of people
    people.push(person);

    // Nominate new person
    nominees.push(nominee);

    this.setState({
      people,
      nominees,
      filtered: people,
      undo: false,
    });

    // Clear search input box
    const input = document.querySelector(SEARCH_BOX);
    input.value = '';
    input.focus();
  }

  removeNominee = (e) => {
    const { key } = e.target.dataset;
    const { nominees: nomineesArr } = this.state;
    const nominees = [...nomineesArr];
    const nomIdx = nominees.findIndex(nominee => nominee.key === key);

    nominees.splice(nomIdx, 1);

    // focus on search input box
    const input = document.querySelector(SEARCH_BOX);
    input.focus();

    this.setState({
      nominees,
      undo: true,
    });
  }

  handleDefault = (e) => {
    e.preventDefault();
  }

  render() {
    const {
      people, filtered, nominees, winners, undo, search,
    } = this.state;
    return (
      <div>
        <form className="search-form" onSubmit={this.handleDefault}>
          <input type="text" className="search-box" placeholder="Search..." onChange={this.filter} />
          <PeopleList
            people={people}
            filtered={filtered}
            nominate={this.nominate}
            add={this.add}
            search={search}
          />
        </form>
        <NomineeList
          people={people}
          nominees={nominees}
          undo={this.undo}
          undoAnimation={undo}
          removeNominee={this.removeNominee}
        />
        <WinnerList pickWinner={this.pickWinner} winners={winners} />
      </div>
    );
  }
}

export default Kudos;

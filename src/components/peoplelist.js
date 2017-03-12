import React, { Component } from 'react';
import '../App.css';
import Person from './person';

class PeopleList extends Component {

    render() {
        return (
            <div className="list-of-people">
            {
                Object
                .keys(this.props.people)
                .sort((a,b) => this.props.people[a].First > this.props.people[b].First ? 1 : -1)
                .map(key => <Person key={key} name={this.props.people[key]} nominate={this.props.nominate} />)
            }
            </div>
        );
    }
}

export default PeopleList;

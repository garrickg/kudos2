import React, { Component } from 'react';
import '../App.css';
import Person from './person';

class PeopleList extends Component {

    render() {
        return (
            <div className="list-of-people">
            {
                Object
                .keys(this.props.filtered)
                .sort((a,b) => this.props.filtered[a].First > this.props.filtered[b].First ? 1 : -1)
                .map(key => <Person key={key} name={this.props.filtered[key]} nominate={this.props.nominate} search={false} highlight={this.props.search} />)
            }
            <Person key={this.props.filtered.length} index={this.props.people.length} add={this.props.add} name={this.props.search} search={true} />
            </div>
        );
    }
}

export default PeopleList;

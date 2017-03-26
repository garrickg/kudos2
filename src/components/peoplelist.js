import React, { Component } from 'react';
import '../App.css';
import Person from './person';

class PeopleList extends Component {

    render() {
        // Check if list of name is not empty from searching
        let search = this.props.filtered.length > 0 ? false : true;
        // Render list of people already in DB, matching search string
        if (!search) {
            return (
                <div className="list-of-people">
                    {
                        Object
                        .keys(this.props.filtered)
                        .sort((a,b) => this.props.filtered[a].First > this.props.filtered[b].First ? 1 : -1)
                        .map(key => <Person key={key} name={this.props.filtered[key]} nominate={this.props.nominate} search={search} highlight={this.props.search} />)
                    }
                </div>
            );
        }
        // Render add new name component, if no search results are present
        else {
            return (
                <div className="list-of-people">
                    <Person key={this.props.filtered.length} index={this.props.people.length} add={this.props.add} name={this.props.search} search={search} />
                </div>
            );
        }
    }
}

export default PeopleList;

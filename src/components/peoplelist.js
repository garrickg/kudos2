import React, { Component } from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../App.css';
import Person from './person';

class PeopleList extends Component {

    render() {
        let search = this.props.filtered.length > 0 ? false : true;
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

import React, { Component } from 'react';
import '../App.css';
import Nominee from './nominee';

class NomineeList extends Component {

    render() {
        return (
            <div className="list-of-nominees">
                <button className="undo-button" onClick={this.props.undo}> <i className="fa fa-undo" aria-hidden="true"></i></button>
                {
                    Object
                    .keys(this.props.nominees)
                    .map(key => <Nominee key={key} name={this.props.nominees[key]} index={key}/>)
                }
            </div>
        );
    }
}

export default NomineeList;

import React, { Component } from 'react';
import '../App.css';
import Winner from './winner';

class WinnerList extends Component {

    render() {
        return (
            <div className="list-of-winners">
                <button className="win-button" onClick={this.props.pickWinner}><i className="fa fa-trophy" aria-hidden="true"></i></button>
                {
                    Object
                    .keys(this.props.winners)
                    .map(key => <Winner key={key} name={this.props.winners[key]} index={key}/>)
                }
            </div>
        );
    }
}

export default WinnerList;

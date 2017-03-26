import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../App.css';
import Winner from './winner';

class WinnerList extends Component {

    render() {
        return (
            <div className="list-of-winners">
                <button className="win-button" onClick={this.props.pickWinner}><i className="fa fa-trophy" aria-hidden="true"></i></button>
                    <ReactCSSTransitionGroup
                        transitionName="win-animation"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                            {
                                Object
                                .keys(this.props.winners)
                                .map(key => <Winner key={key} name={this.props.winners[key]} index={key}/>)
                            }
                    </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default WinnerList;

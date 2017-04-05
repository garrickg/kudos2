import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../App.css'
import Nominee from './nominee'

class NomineeList extends Component {
  render () {
    const [animation, timeout] = this.props.undoAnimation ? ['undo', 300] : ['nominate', 2000]
    return (
      <div className='list-of-nominees'>
        <button className='undo-button' onClick={this.props.undo}> <i className='fa fa-undo' aria-hidden='true' /></button>
        <ReactCSSTransitionGroup
          transitionName={`${animation}-animation`}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={timeout}>
          {
                                Object
                                .keys(this.props.nominees)
                                .map(key => {
                                  const nominee = this.props.nominees[key]
                                    // All components given unique key for proper animations
                                  return <Nominee key={`${nominee.NomKey}.${nominee.index}`} name={nominee} index={key} />
                                })
                            }
        </ReactCSSTransitionGroup>
        <span className='counter'>{this.props.nominees.length}</span>
      </div>
    )
  }
}

export default NomineeList

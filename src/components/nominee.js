import React, { Component } from 'react'
import '../App.css'

class Nominee extends Component {
  render () {
    return (
      <span className='nominee' data-key={this.props.index} onClick={this.props.removeNominee}>
        {`${this.props.name.First} ${this.props.name.Last}`}
      </span>
    )
  }
}

export default Nominee

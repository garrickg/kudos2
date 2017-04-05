import React, { Component } from 'react'
import '../App.css'
import Base from '../base'

class Login extends Component {
    // Opens google OAuth popup, for logging into DB
    // Rules for authorized users are maintained in Firebase Backend Rules
  login = () => {
    Base.authWithOAuthPopup('google', (error, user) => error ? console.error(error) : console.log('Logging In!'))
  }

  render () {
    return <button className='login-button' onClick={this.login}>Login</button>
  }
}

export default Login

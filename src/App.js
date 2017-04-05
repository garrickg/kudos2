import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Base from './base'
import Logo from '../public/logo_white.png'
import Kudos from './components/kudos'
import Login from './components/login'
import Logout from './components/logout'
import NotFound from './components/notfound'

// PrivateRoute will render protected component with props if logged in and authorized, and redirect to login page otherwise
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

// Public Route will render unprotected component if logged out, otherwise will redirect to kudos component
function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/kudos' />}
    />
  )
}

class App extends Component {
  // Initialize state
  state = {
    authed: false,
    loading: true,
    modalOpen: false
  }

  // Adds auth listener to firebase
  componentDidMount () {
    this.removeListener = Base.onAuth((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  // Unbinds auth listener
  componentWillUnmount () {
    this.removeListener()
  }

  // Toggle open state for logout modal
  openModal = () => {
    if (this.state.authed) {
      this.setState({
        modalOpen: true
      })
    }
  }

  // Sends logout command to DB, closes modal
  logout = () => {
    Base.unauth()
    this.setState({
      modalOpen: false
    })
  }

  // Closes modal without logging out
  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }

  render () {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <div className='header'>
            <span>Kudos</span>
            <span className='small'> v2.0</span>
            <img onClick={this.openModal} className='logo' src={Logo} alt='StarFish Logo' />
          </div>
          <Logout open={this.state.modalOpen} logout={this.logout} close={this.closeModal} />
          <Switch>
            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
            <PrivateRoute authed={this.state.authed} path='/kudos' component={Kudos} />
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

import './app.css';

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Logo from './assets/logo_white.png';
import Base from './base';
import Kudos from './components/kudos';
import Login from './components/login';
import Logout from './components/logout';
import NotFound from './components/notfound';
import Time from './components/time';

// PrivateRoute will render protected component with props
// if logged in and authorized, and redirect to login page otherwise
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  );
}

// Public Route will render unprotected component
// if logged out, otherwise will redirect to kudos component
function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (authed === false
        ? <Component {...props} />
        : <Redirect to="/kudos" />)}
    />
  );
}

class App extends React.Component {
  // Initialize state
  state = {
    authed: false,
    loading: true,
    modalOpen: false,
    path: '',
  }

  // Adds auth listener to firebase
  componentDidMount() {
    this.removeListener = Base.onAuth((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  // Unbinds auth listener
  componentWillUnmount() {
    this.removeListener();
  }

  // Toggle open state for logout modal
  openModal = () => {
    const { authed } = this.state;
    if (authed) {
      this.setState({
        modalOpen: true,
      });
    }
  }

  // Sends logout command to DB, closes modal
  logout = () => {
    Base.unauth();
    this.setState({
      modalOpen: false,
    });
  }

  // Closes modal without logging out
  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const { loading, modalOpen, authed } = this.state;
    return loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <div className="header">
            <span>Kudos</span>
            <img
              onClick={this.openModal} 
              onKeyPress={e => e.which === 13 && this.openModal}
              className="logo"
              src={Logo}
              alt="StarFish Logo"
              tabIndex={0}
            />
          </div>
          <Logout open={modalOpen} logout={this.logout} close={this.closeModal} />
          <Switch>
            <PublicRoute authed={authed} path="/login" component={Login} />
            <PrivateRoute authed={authed} path="/kudos" component={Kudos} />
            <PrivateRoute authed={authed} path="/time" component={Time} />
            <PublicRoute component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

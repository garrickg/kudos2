import React, { Component } from 'react';
import '../App.css';
import Base from '../base';

class Login extends Component {

    login = () => {
        Base.authWithOAuthPopup('google', (error, user) => {
            if (error) {
                return console.error(error);
            }
            return console.log('Logging In!');
        });
    }

    render() {
        return (
            <div>
                <button className="login-button" onClick={this.login}>Login</button>
            </div>
        );
    }

}

export default Login;
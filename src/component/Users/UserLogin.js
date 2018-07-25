import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api';
import FailedLogin from './failedLogin';

export let userId = 'helloe there';

class UserLogin extends Component {
  state = {
    username: '',
    password: '',

    loggedIn: false,
    failedLogin: false
  };

  render() {
    console.log(this.state.failedLogin, '<<<<<<<');
    if (this.state.loggedIn) {
      return (
        <div className="loggedInProfile">
          <h3>Logged in as {this.state.username}</h3>
        </div>
      );
    } else
      return (
        <div className="Login">
          <form onSubmit={this.handleLogin}>
            <input
              className="inputUsername"
              type="text"
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
            <br />
            <input
              className="inputPassword"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
            <br />
            <FailedLogin failedLogin={this.state.failedLogin} />
            <button>login</button>
            <br />
            <Link to="/login-createAcc">Sign up</Link>
          </form>
        </div>
      );
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleLogin = event => {
    event.preventDefault();
    api.getUsers().then(userlist => {
      if (!userlist[this.state.username]) {
        return this.setState({ failedLogin: true });
      }
      if (userlist[this.state.username].password === this.state.password) {
        this.setState({
          loggedIn: true
        });
      }
    });
  };
}

export default UserLogin;

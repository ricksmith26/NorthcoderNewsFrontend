import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from 'react-router-dom';

class CreateUser extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    sucessful: false,
    usernameTaken: false
  };

  render() {
    if (this.state.sucessful)
      return (
        <div>
          <h2>Account created for {this.state.username}</h2>
          <Link to={`/`}>
            <h2>Click here to go home</h2>
          </Link>
        </div>
      );
    if (this.state.usernameTaken)
      return (
        <div>
          <h2>Username {this.state.username} is already being used</h2>{' '}
        </div>
      );
    else
      return (
        <div className="createUserDiv">
          <form className="createForm" id="userform" onSubmit={this.submitUser}>
            <p>Pick a Username</p>
            <input
              type="text"
              onChange={this.handleUsernameChange}
              autoComplete="no"
            />
            <br />
            <p>Name:</p>
            <input
              type="text"
              onChange={this.handleNameChange}
              autoComplete="no"
            />
            <br />
            <p>Password:</p>
            <input
              type="password"
              onChange={this.handlePasswordChange}
              autoComplete="no"
            />
            <br />
            <br />
            <button>Create Account</button>
          </form>
        </div>
      );
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  submitUser = event => {
    const userData = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };

    event.preventDefault();
    api.addUser(userData).then(() => {
      this.setState({
        sucessful: true
      });
    });

    this.setState({ usernameTaken: true });
  };
}

export default CreateUser;

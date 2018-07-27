import React, { Component } from 'react';
import * as api from '../../api';

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
    console.log(event.target.value, 'username');
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
    console.log(event.target.value, 'name');
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
    console.log(event.target.value, 'password');
  };

  submitUser = event => {
    const userData = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };
    const userOb = api.getUsers();

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

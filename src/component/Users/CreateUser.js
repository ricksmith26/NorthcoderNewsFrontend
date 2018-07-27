import React, { Component } from 'react';
import * as api from '../../api';

class CreateUser extends Component {
  state = {
    username: '',
    name: '',
    password: ''
  };

  render() {
    return (
      <div className="createUserDiv">
        <form className="createForm">
          <p>Pick a Username</p>
          <input type="text" onChange={this.handleUsernameChange} />
          <br />
          <p>Name:</p>
          <input type="text" onChange={this.handleNameChange} />
          <br />
          <p>Password:</p>
          <input type="password" onChange={this.handlePasswordChange} />
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

  submitUser = async () => {
    console.log('hit');
    const userData = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    };

    const newUser = await api.addUser(userData);
  };
}

// handlePostMessage = async () => {
//   const currentUser = this.props.username;
//   const comment = {
//     body: this.state.userInput,
//     created_by: currentUser,
//     username: currentUser
//   };

//   const newComment = await api.postComment(this.props.article_id, comment);
//   this.props.addComment(newComment);
//   this.setState({ userInput: '' });
// };

export default CreateUser;

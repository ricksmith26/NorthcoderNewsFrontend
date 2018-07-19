import React, { Component } from 'react';

class UserLogin extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="loggedInProfile">
          <h3>Logged in as {this.props.loggedIn}</h3>
        </div>
      );
    } else return <div className="Login">LogIn/SignUp</div>;
  }
}

export default UserLogin;

import React from 'react';
import { Link } from 'react-router-dom';
import FailedLogin from './failedLogin';

export const LoggedUserContext = React.createContext();

function UserLogin({
  username,
  password,
  id,
  loggedIn,
  failedLogin,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin
}) {
  if (loggedIn) {
    return (
      <div className="loggedInProfile">
        <h3>Logged in as {username}</h3>
      </div>
    );
  } else
    return (
      <div className="Login">
        <form onSubmit={handleLogin}>
          <input
            className="inputUsername"
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
            autoComplete="on"
          />
          <br />
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            autoComplete="on"
          />
          <FailedLogin failedLogin={failedLogin} />
          <button>login</button>

          <br />
          <Link to="/login-createAcc">Sign up</Link>
        </form>
      </div>
    );
}

export default UserLogin;

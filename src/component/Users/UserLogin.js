import React from 'react';
import { Link } from 'react-router-dom';
import FailedLogin from './failedLogin';
import PropTypes from 'prop-types';

export const LoggedUserContext = React.createContext();

function UserLogin({
  username,
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
          <Link to="/login-createAcc">
            <p className="createAcc">Sign up</p>
          </Link>
        </form>
      </div>
    );
}
UserLogin.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  failedLogin: PropTypes.bool.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default UserLogin;

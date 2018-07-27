import React from 'react';

function FailedLogin({ failedLogin }) {
  console.log(failedLogin);
  if (failedLogin) {
    return <p>Incorrect Username/Password</p>;
  } else {
    return <p>Enter Username & Password</p>;
  }
}

export default FailedLogin;

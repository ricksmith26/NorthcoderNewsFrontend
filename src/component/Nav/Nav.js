import { NavLink } from 'react-router-dom';
import React from 'react';

function Nav() {
  return (
    <div>
      <NavLink exact to="/">
        <p className="createAcc">Home</p>
      </NavLink>
    </div>
  );
}

export default Nav;

import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <h1 className="error404">
      Computer says no!! We can't find the page you're looking for (404)
      <br />
      <Link to="/" className="link">
        Click here to return to main page
      </Link>
    </h1>
  );
};

export default Error404;

import React from 'react';

function DeleteCommentFunc({ currentUser, authorUser, id, deleteCom }) {
  if (currentUser === authorUser) {
    return <button onClick={() => deleteCom(id)}>Delete</button>;
  } else {
    return null;
  }
}

export default DeleteCommentFunc;

import React from 'react';
import { deleteComment } from '../../api';

function deleteCommentFunc(currentUser, authorUser, id) {
  if (currentUser === authorUser)
    return <button onClick={() => deleteComment(id)}>Delete</button>;
}

export default deleteCommentFunc;

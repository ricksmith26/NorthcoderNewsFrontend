import React from 'react';
import * as api from '../../api';
import PropTypes from 'prop-types';

class CommentInput extends React.Component {
  state = {
    userInput: ''
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <div className="messageInputContainer">
          <input
            className="commentBox"
            type="text"
            onKeyUp={this.handleKeyPress}
            onChange={this.handleInputChange}
            value={this.state.userInput}
            placeholder="Enter your comment..."
          />
        </div>
      );
    } else {
      return <p className="commentInputAlt">Login to comment</p>;
    }
  }
  handleKeyPress = event => {
    if (event.keyCode === 13) {
      this.handlePostMessage(this.props.article_id, {
        body: this.state.userInput,
        created_by: 'jessjelly'
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      userInput: event.target.value
    });
  };

  handlePostMessage = async () => {
    const currentUser = this.props.username;
    const comment = {
      body: this.state.userInput,
      created_by: currentUser,
      username: currentUser
    };

    const newComment = await api.postComment(this.props.article_id, comment);
    this.props.addComment(newComment);
    this.setState({ userInput: '' });
  };
}
CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default CommentInput;

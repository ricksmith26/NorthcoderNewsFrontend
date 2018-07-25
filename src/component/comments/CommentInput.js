import React from 'react';
import * as api from '../../api';

class CommentInput extends React.Component {
  state = {
    userInput: ''
  };

  render() {
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
    const currentUser = 'jessjelly';
    const comment = {
      body: this.state.userInput,
      created_by: 'jessjelly',
      username: currentUser
    };

    const newComment = await api.postComment(this.props.article_id, comment);
    console.log(newComment);
    this.props.addComment(newComment);
    this.setState({ userInput: '' });
  };
}

export default CommentInput;

import React, { Component } from 'react';
import thumbsUp from '../../Thumbs-Up.svg';
import thumbsDown from '../../thumbs-down.svg';

class CommentVote extends Component {
  state = {
    voteUp: false,
    voteDown: false
  };
  render() {
    return (
      <div>
        {this.voteUp ? (
          <p>You have voted up</p>
        ) : (
          <img
            className="thumbsUpCom"
            src={thumbsUp}
            alt="thumbsUp"
            onClick={e => this.handleVoteUp(this.props.id)}
          />
        )}
        {this.props.voteDown ? (
          <p>You have voted down</p>
        ) : (
          <img
            className="thumbsUpCom"
            src={thumbsDown}
            alt="thumbsUpDown"
            onClick={e => this.handleVoteDown(this.props.id)}
          />
        )}
      </div>
    );
  }
  handleVoteUp = async id => {
    if (this.state.voteUp === false) {
      this.setState({ voteUp: true });
      this.props.voteState(id, 1);
    }
  };

  handleVoteDown = async id => {
    if (this.state.voteDown === false) {
      this.setState({ voteDown: true });
      this.props.voteState(id, -1);
    }
  };
}

export default CommentVote;

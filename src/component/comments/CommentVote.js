import React, { Component } from 'react';

class CommentVote extends Component {
  render() {
    return (
      <div>
        {this.props.voteUp ? (
          <p>You have voted up</p>
        ) : (
          <button onClick={e => this.props.handleVoteUp(this.props.id)}>
            Vote up
          </button>
        )}
        {this.props.voteDown ? (
          <p>You have voted down</p>
        ) : (
          <button onClick={e => this.props.handleVoteDown(this.props.id)}>
            Vote Down
          </button>
        )}
      </div>
    );
  }
}

export default CommentVote;

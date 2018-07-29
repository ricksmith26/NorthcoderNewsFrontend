import React, { Component } from 'react';
import thumbsUp from '../../Thumbs-Up.svg';

class ArticleVote extends Component {
  render() {
    console.log('voteRender');
    return (
      <div className="voteDiv">
        <p>click thumbs to vote</p>
        {this.props.voteUp ? (
          <p>You have voted up</p>
        ) : (
          <img
            className="thumbsUp"
            src={thumbsUp}
            alt="thumbsUp"
            onClick={e => this.props.handleVoteUp()}
          />
        )}
        {this.props.voteDown ? (
          <p>You have voted down</p>
        ) : (
          <img
            className="thumbsDown"
            src={thumbsUp}
            alt="thumbsDown"
            onClick={e => this.props.handleVoteDown()}
          />
        )}
      </div>
    );
  }
}

export default ArticleVote;

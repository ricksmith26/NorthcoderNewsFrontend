import React, { Component } from 'react';

class ArticleVote extends Component {
  render() {
    console.log('article vote');
    return (
      <div className="voteDiv">
        {this.props.voteUp ? (
          <p>You have voted up</p>
        ) : (
          <button onClick={e => this.props.handleVoteUp()}>Vote Up</button>
        )}
        {this.props.voteDown ? (
          <p>You have voted down</p>
        ) : (
          <button onClick={e => this.props.handleVoteDown()}>Vote Down</button>
        )}
      </div>
    );
  }
}

export default ArticleVote;

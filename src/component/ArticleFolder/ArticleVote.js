import React, { Component } from 'react';
import thumbsUp from '../../assets/Thumbs-Up.svg';
import * as api from '../../api';

class ArticleVote extends Component {
  state = {
    vote: 0
  };

  render() {
    return (
      <div className="voteDiv">
        <p>Votes: {this.props.votes + this.state.vote}</p>
        <p>click thumbs to vote</p>
        {this.state.voteUp === 1 ? (
          <p>You have voted up</p>
        ) : (
          <img
            className="thumbsUp"
            src={thumbsUp}
            alt="thumbsUp"
            onClick={e => this.handleVoteUp()}
          />
        )}
        {this.state.voteDown >= -1 ? (
          <p>You have voted down</p>
        ) : (
          <img
            className="thumbsDown"
            src={thumbsUp}
            alt="thumbsDown"
            onClick={e => this.handleVoteDown()}
          />
        )}
      </div>
    );
  }
  handleVoteUp = async () => {
    await api.voteArticle(this.props.article_id, {
      vote: 'up'
    });
    this.setState({ vote: 1 });
  };

  handleVoteDown = async () => {
    await api.voteArticle(this.props.article_id, {
      vote: 'down'
    });

    this.setState({ vote: -1 });
  };
}

export default ArticleVote;

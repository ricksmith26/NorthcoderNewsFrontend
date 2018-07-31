import React, { Component } from 'react';
import thumbsUp from '../../assets/Thumbs-Up.svg';
import * as api from '../../api';

class ArticleVote extends Component {
  state = {
    voteUp: false,
    voteDown: false
  };
  render() {
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
            onClick={e => this.handleVoteUp()}
          />
        )}
        {this.props.voteDown ? (
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
    const article = await api.voteArticle(this.state.article._id, {
      vote: 'up'
    });

    this.setState({ article, voteUp: true });
  };

  handleVoteDown = async () => {
    const article = await api.voteArticle(this.state.article._id, {
      vote: 'down'
    });

    this.setState({ article, voteDown: true });
  };
}

export default ArticleVote;

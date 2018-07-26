import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from 'react-router-dom';
import ArticleVote from './ArticleVote';

class FullArticleView extends Component {
  state = {
    article: [],
    voteUp: false,
    voteDown: false
  };

  async componentDidMount() {
    const article = await api.getArticleById(
      this.props.match.params.article_id
    );

    this.setState({ article });
  }

  render() {
    return (
      <div className="fullArticle">
        <div className="subFullArticle">
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.body}</p>
          <Link to={`/users/${this.state.article.username}`}>
            {' '}
            <p>{this.state.article.username}</p>
          </Link>
          <p>Votes: {this.state.article.votes}</p>
          <Link to={`/articles/${this.state.article._id}/comments`}>
            {' '}
            <p>Comments: {this.state.article.comments}</p>
          </Link>
          <ArticleVote
            voteUp={this.state.voteUp}
            voteDown={this.state.voteDown}
            handleVoteUp={this.handleVoteUp}
            handleVoteDown={this.handleVoteDown}
            votes={this.state.article.votes}
          />
        </div>
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

export default FullArticleView;

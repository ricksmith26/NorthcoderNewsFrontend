import React, { Component } from 'react';
import * as api from '../../api';
import { Link, Route } from 'react-router-dom';
import ArticleVote from './ArticleVote';
import Error404 from './Error404';

class FullArticleView extends Component {
  state = {
    article: [],
    voteUp: false,
    voteDown: false
  };

  async componentDidMount() {
    try {
      const article = await api.getArticleById(
        this.props.match.params.article_id
      );

      this.setState({ article });
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 400)
        this.props.history.push('404');
      else this.props.history.push('500');
    }
  }

  render() {
    console.log('fullRen');
    return (
      <div className="fullArticle">
        <div className="subFullArticle">
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.body}</p>
          <Link to={`/users/${this.state.article.username}`}>
            {' '}
            <p className="underlined">{this.state.article.username}</p>
          </Link>
          <p>Votes: {this.state.article.votes}</p>
          <Link to={`/articles/${this.state.article._id}/comments`}>
            {' '}
            <p className="underlined">
              Comments: {this.state.article.comments}
            </p>
          </Link>
          <ArticleVote
            voteUp={this.state.voteUp}
            voteDown={this.state.voteDown}
            handleVoteUp={this.handleVoteUp}
            handleVoteDown={this.handleVoteDown}
            votes={this.state.article.votes}
          />
          <Route exact path="/articles/404" component={Error404} />
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

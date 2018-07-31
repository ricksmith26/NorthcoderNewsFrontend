import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from 'react-router-dom';
import ArticleVote from './ArticleVote';
import Error404 from './Error404';

class FullArticleView extends Component {
  state = {
    article: {}
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
    if (this.props.match.params.article_id !== '404') {
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
              handleVoteUp={this.handleVoteUp}
              handleVoteDown={this.handleVoteDown}
              votes={this.state.article.votes}
            />
          </div>
        </div>
      );
    } else {
      return <Error404 />;
    }
  }
}

export default FullArticleView;

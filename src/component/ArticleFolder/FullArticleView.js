import React, { Component } from 'react';
import * as api from '../../api';
import { Link } from 'react-router-dom';

class FullArticleView extends Component {
  state = {
    article: []
  };

  async componentDidMount() {
    const article = await api.getArticleById(
      this.props.match.params.article_id
    );

    this.setState({ article });
  }

  render() {
    return (
      <div>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.body}</p>
        <p>{this.state.article.username}</p>
        <p>Votes: {this.state.article.votes}</p>
        <Link to={`/articles/${this.state.article._id}/comments`}>
          {' '}
          <p>Comments: {this.state.article.comments}</p>
        </Link>
      </div>
    );
  }
}

export default FullArticleView;

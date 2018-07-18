import React, { Component } from 'react';
import * as api from '../../api';
import ArticlesList from '../ArticleFolder/ArticlesList';

class Users extends Component {
  state = {
    users: [],
    filtered: []
  };

  async componentDidMount() {
    const users = await api.fetchUsers(this.props.match.params.username);
    const articles = await api.fetchArticles();
    const user = this.props.match.params.username;
    const authorArticles = (articles, user) => {
      return articles.filter(function(a) {
        return a.created_by === user;
      });
    };

    this.setState({
      users: users.data[0],
      filtered: authorArticles(articles, user)
    });
  }

  render() {
    return (
      <div className="userClass">
        <div className="userInfo">
          <img src={this.state.users.avatar_url} alt="avatar profile" />
          <h2>{this.state.users.username}</h2>
          <ArticlesList articles={this.state.filtered} />
        </div>
      </div>
    );
  }
}

export default Users;

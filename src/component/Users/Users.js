import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import * as api from '../../api';
import ArticlesList from '../ArticleFolder/ArticlesList';

class Users extends Component {
  state = {
    users: [],
    filtered: []
  };

  async componentDidMount() {
    try {
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
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 400)
        this.props.history.push('404');
      else this.props.history.push('500');
    }
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

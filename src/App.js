import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Articles from '../src/component/ArticleFolder/Articles';
import FullArticleView from '../src/component/ArticleFolder/FullArticleView';
import Users from '../src/component/Users/Users';
import { Route, NavLink, Link } from 'react-router-dom';
import CommentsPage from './component/comments/comments';
import UserLogin from './component/Users/UserLogin';
import * as api from '../src/api';

class App extends Component {
  state = {
    username: '',
    password: '',
    id: '',
    loggedIn: false,
    failedLogin: false
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <figure>
            <div>
              <UserLogin
                username={this.state.username}
                password={this.state.password}
                id={this.state.id}
                loggedIn={this.state.loggedIn}
                failedLogin={this.state.loggedIn}
                handleUsernameChange={this.handleUsernameChange}
                handlePasswordChange={this.handlePasswordChange}
                handleLogin={this.handleLogin}
              />
            </div>
            <div>
              <Link to={`/`}>
                {' '}
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
              <h1 className="App-title">Northcoder News</h1>
              <Nav />
            </div>
          </figure>
        </header>
        <div className="background">
          <Route exact path="/" component={Articles} />
          <Route exact path="/users/:username" component={Users} />
          <Route
            exact
            path="/articles/:article_id"
            component={FullArticleView}
          />

          <Route
            exact
            path="/articles/:article_id/comments"
            render={props => (
              <CommentsPage
                {...props}
                id={this.state.id}
                username={this.state.username}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
        </div>
      </div>
    );
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleLogin = event => {
    event.preventDefault();
    api.getUsers().then(userlist => {
      if (!userlist[this.state.username]) {
        return this.setState({ failedLogin: true });
      }
      if (userlist[this.state.username].password === this.state.password) {
        this.setState({
          loggedIn: true,
          id: userlist[this.state.username]._id
        });
      }
    });
  };
}
function Nav() {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
    </div>
  );
}
export default App;

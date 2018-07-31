import React, { Component } from 'react';
import logo from './assets/logo.jpg';
import './App.css';
import Articles from '../src/component/ArticleFolder/Articles';
import FullArticleView from '../src/component/ArticleFolder/FullArticleView';
import Users from '../src/component/Users/Users';
import { Route, Link } from 'react-router-dom';
import CommentsPage from './component/comments/comments';
import UserLogin from './component/Users/UserLogin';
import * as api from '../src/api';
import CreateUser from '../src/component/Users/CreateUser';
import facebook from './assets/Follow-us.png';
import Error500 from './component/ArticleFolder/Error500';
import Nav from '../src/component/Nav/Nav';

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
          <UserLogin
            className="userlogin"
            username={this.state.username}
            password={this.state.password}
            id={this.state.id}
            loggedIn={this.state.loggedIn}
            failedLogin={this.state.failedLogin}
            handleUsernameChange={this.handleUsernameChange}
            handlePasswordChange={this.handlePasswordChange}
            handleLogin={this.handleLogin}
          />

          <div className="maintitle">
            <Link to={`/`}>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <h1 className="App-title">Northcoder News</h1>
            <Nav />
            <a href="https://www.facebook.com/northcoders/">
              <img src={facebook} className="facebook" alt="facebook" />
            </a>
          </div>
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
          <Route exact path="/login-createAcc" component={CreateUser} />

          <Route exact path="/articles/500" component={Error500} />
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

export default App;

import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Articles from '../src/component/ArticleFolder/Articles';
import FullArticleView from '../src/component/ArticleFolder/FullArticleView';
import Users from '../src/component/Users/Users';
import { Route, NavLink } from 'react-router-dom';
import CommentsPage from './component/comments/comments';
import UserLogin from './component/Users/UserLogin';

class App extends Component {
  state = {
    loggedIn: 'jessjelly'
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserLogin loggedIn={this.state.loggedIn} />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Northcoder News</h1>
          <br />
          <Nav />
        </header>
        <Route exact path="/" component={Articles} />
        <Route exact path="/users/:username" component={Users} />
        <Route exact path="/articles/:article_id" component={FullArticleView} />
        <Route
          exact
          path="/articles/:article_id/comments"
          component={CommentsPage}
        />
      </div>
    );
  }
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

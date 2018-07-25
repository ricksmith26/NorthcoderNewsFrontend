import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Articles from '../src/component/ArticleFolder/Articles';
import FullArticleView from '../src/component/ArticleFolder/FullArticleView';
import Users from '../src/component/Users/Users';
import { Route, NavLink, Link } from 'react-router-dom';
import CommentsPage from './component/comments/comments';
import UserLogin from './component/Users/UserLogin';

class App extends Component {
  state = {
    loggedIn: '',
    loggedUserId: ''
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <figure>
            <div>
              <UserLogin loggedIn={this.state.loggedIn} />
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
            component={CommentsPage}
          />
        </div>
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

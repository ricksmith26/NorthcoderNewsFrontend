import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Articles from '../src/component/ArticleFolder/Articles';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Northcoder News</h1>
        </header>
        <Route exact path="/" component={Articles} />
      </div>
    );
  }
}

export default App;

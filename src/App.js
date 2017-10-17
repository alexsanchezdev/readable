import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './ReadableAPI'

class App extends Component {
  componentDidMount() {
      ReadableAPI.getPostDetails("1cb67e15-c1be-4c9f-b2c0-d8831fed53c2").then( res => console.log(res))
      ReadableAPI.deletePost('1cb67e15-c1be-4c9f-b2c0-d8831fed53c2').then( res => console.log(res))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

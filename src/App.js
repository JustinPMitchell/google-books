import React, { Component } from 'react';
import './App.css';
import Search from './search/search.js';
require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="App">
        <Search />
        <div className="list">
        </div>
        <footer className="footer">Created by <a className="footer-link" target="_blank" href="https://justinpmitchell.github.io/jpm/">Justin Mitchell</a> © 2019</footer>
      </div>
    );
  }
}

export default App;

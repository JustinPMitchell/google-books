import React, { Component } from 'react';
import './App.css';
import Search from './search/Search.jsx';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <div className="list"></div>
        <footer className="footer">Created by <a className="footer-link" target="_blank" href="https://justinpmitchell.github.io/jpm/">Justin Mitchell</a> © 2019</footer>
      </div>
    );
  }
}

export default App;

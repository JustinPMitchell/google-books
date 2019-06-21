import React, { Component } from 'react';
import './App.css';
import Search from './search/search.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authors: [],
      title: [],
      publisher: [],
      picture: [],
      link: [],
      genre: [],
      information: [] 
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;

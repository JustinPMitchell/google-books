import React, {Component} from 'react';
import * as handleQueryChange from './handleQueryChange.js';
import * as searchBooks from './searchBooks.js';
import * as createBooks from '../book/createBooks.js';

class Search extends Component {

  constructor(props) {
  	super(props)
    this.state = {
      query: '',
      queryWithPlus: ''
  	}

    // binding functions
    this.handleQueryChange = handleQueryChange.handleQueryChange.bind(this);
    this.searchBooks = searchBooks.searchBooks.bind(this);
    this.searchNextBooks = searchBooks.searchNextBooks.bind(this);
    this.createBooks = createBooks.createBooks.bind(this);

    // the google books api limits the amout of calls to 1000 per day,
    // timeout and timeoutForQuery are used to wait while the user is inputing before searching the api
    this.timeout = null;
    this.timeoutForQuery = 500;
    // the google books api limits the amount of calls to 1000 per day, 
    // startIndex and maxStartIndex prevents too many calls
    this.startIndex = 1;
    this.maxStartIndex = 161;
    // the google books api limits the call to 40 books per call
    this.changeIndex = 40;
    this.list = document.getElementsByClassName("list")[0];
  }

  render() {
    return (
	  <div className="Search">
	    <h1 className="title">Book Search</h1>
	    <form onSubmit={(e) => this.searchBooks(e)} className="search-box-form">
			  <input type="text" name="search" className="search-box" value={this.state.query} onChange={this.handleQueryChange}></input>
		  </form>
	  </div>
    );
  }
}

export default Search;
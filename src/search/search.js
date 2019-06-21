import React, {Component} from 'react';

class Search  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      authors: [],
      title: [],
      publisher: [],
      picture: [],
      link: [],
      genre: [],
      information: []
    }

    this.searchBooks = this.searchBooks.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  searchBooks() {
    const googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    let startI = 1;
    let maxStartIndex = 21;

    function searchTenBooks(startIndex) {
	    fetch("https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&startIndex=" + startIndex)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          if(result.items && startI <= maxStartIndex) {
	          	for(let i = 0; i < result.items.length; i++) {
		          console.log(result.items[i].volumeInfo.title);
		        }
	          	startI += 10;
	          	searchTenBooks(startI);
	          }
	        });
	}

	searchTenBooks(startI);
  }

  handleQueryChange(event) {
  	this.setState({ query: event.target.value })
  }

  render() {
    return (
	    <div className="Search">
		    <input type="text" name="search" value={this.state.value} onChange={this.handleQueryChange}></input>
		    <button onClick={() => this.searchBooks()}>Search</button> 
	    </div>
    );
  }
}

export default Search;
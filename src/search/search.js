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
  	let that = this;
    const googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    let startI = 1;
    let maxStartIndex = 21;
    let authors = [];
    let title = [];
    let publisher = [];
    let picture = [];
    let link = [];
    let genre = [];
    let information = [];
    let lastChild = document.getElementsByClassName("list")[0].lastElementChild;

    while(lastChild) {
    	document.getElementsByClassName("list")[0].removeChild(lastChild);
    	lastChild = document.getElementsByClassName("list")[0].lastElementChild;
    }

    function searchTenBooks(startIndex) {
    	// let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&startIndex=`;
    	// let stateQuery = ({this.state.query});
    	// console.log("THIS IS THE QUERY: " + url);
	    fetch(`https://www.googleapis.com/books/v1/volumes?q=${that.state.query}&startIndex=` + startIndex)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          if(result.items && startI <= maxStartIndex) {
	          	for(let i = 0; i < result.items.length; i++) {
		          console.log(result.items[i].volumeInfo.title);
		          // author: json.items[i].volumeInfo.authors
					// title: json.items[i].volumeInfo.title //this can beapc an array
					// publishing company: json.items[i].volumeInfo.publisher
					// picture: json.items[i].volumeInfo.imageLinks.thumbnail

					// link: json.items[i].volumeInfo.infoLink

					// genre: json.items[i].volumeInfo.categories // this can be an array
					// info: json.items[i].volumeInfo.searchInfo.textSnippet

				  // create container
				  let containerElement = document.createElement("div");
				  containerElement.className = "book-container";

				  // create thumbnail and add link
				  let thumbnailContainer = document.createElement("a");
				  thumbnailContainer.href = result.items[i].volumeInfo.infoLink;
				  thumbnailContainer.className = "thumbnail-container";
		          let thumbnailElement = document.createElement("img");
		          thumbnailElement.src = result.items[i].volumeInfo.imageLinks.thumbnail;
				  thumbnailContainer.appendChild(thumbnailElement);		          
		          containerElement.appendChild(thumbnailContainer);

				  // set hover
				  let hoverContainer = document.createElement("div");
				  hoverContainer.className = "hover-container";
				  // create title
		          let titleElement = document.createElement("div");
		          let titleNode = document.createTextNode(result.items[i].volumeInfo.title);
		          titleElement.appendChild(titleNode);
		          hoverContainer.appendChild(titleElement);	
				  // create author
		          let authorElement = document.createElement("div");
		          let authorNode = document.createTextNode("by " + result.items[i].volumeInfo.authors);
		          authorElement.appendChild(authorNode);
		          hoverContainer.appendChild(authorElement);		          	          
		          // create publisher
		          let publisherElement = document.createElement("div");
		          let publisherNode = document.createTextNode("\n Publisher: " + result.items[i].volumeInfo.publisher);
		          publisherElement.appendChild(publisherNode);
		          hoverContainer.appendChild(publisherElement);
		          containerElement.appendChild(hoverContainer);



		          // containerElement.appendChild(linkElement);	          		          		          		          
		          document.getElementsByClassName("list")[0].appendChild(containerElement);
		        }
	          	startI += 10;
	          	searchTenBooks(startI);
	          }
	        });



	}
	searchTenBooks(startI);
	this.setState({ authors: authors });
  }

  handleQueryChange(event) {
  	this.setState({ query: event.target.value })
  }

  render() {
    return (
	    <div className="Search">
		    <input type="text" name="search" value={this.state.query} onChange={this.handleQueryChange}></input>
		    <button onClick={() => this.searchBooks()}>Search</button>
		    <div class="list">
		    </div>
	    </div>
    );
  }
}

export default Search;
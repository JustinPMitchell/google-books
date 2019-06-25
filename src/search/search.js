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

  searchBooks(e) {
  	e.preventDefault();
  	console.log("searching books...");
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
    	if ((startIndex - 1) % 20 === 0 && startIndex !== 1) {
    		// console.log('THIS HAPPENED', startIndex);
    		let apiLinkBlock = document.createElement("a");
    		let apiLinkNode = document.createTextNode("Find more books here");
    		apiLinkBlock.appendChild(apiLinkNode);
			apiLinkBlock.href = 'https://books.google.com';
    		apiLinkBlock.className = "api-link-block";
    		document.getElementsByClassName("list")[0].appendChild(apiLinkBlock);
    	}
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

				  // create title
		          let titleElement = document.createElement("div");
		          let titleNode = document.createTextNode(result.items[i].volumeInfo.title);
		          titleElement.appendChild(titleNode);
		          titleElement.className = "title-element";
		          containerElement.appendChild(titleElement);	

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
				  // create author
		          let authorElement = document.createElement("div");
		          let authorNode = document.createTextNode("by " + result.items[i].volumeInfo.authors);
		          authorElement.appendChild(authorNode);
		          authorElement.className = "author-element";
		          hoverContainer.appendChild(authorElement);		          	          
		          // create publisher
		          let publisherElement = document.createElement("div");
		          let publisherNode = document.createTextNode("\n Publisher: " + result.items[i].volumeInfo.publisher);
		          publisherElement.appendChild(publisherNode);
		          publisherElement.className = "publisher-element";
		          hoverContainer.appendChild(publisherElement);
		          containerElement.appendChild(hoverContainer);


		    // <button onClick={() => this.searchBooks()}>Search</button>
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
  	if (!event.target.value) {
		document.getElementsByClassName("search-box")[0].style.background = "";
  	} else {
  		document.getElementsByClassName("search-box")[0].style.background = "white";
  	}
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
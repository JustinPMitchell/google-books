import React, {Component} from 'react';
require('dotenv').config();

class Search  extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      queryWithPlus: ''
    }

    this.searchBooks = this.searchBooks.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.timeout = null;
  }

  searchBooks(e) {
  	// prevents the form from refreshing page
  	if(e)
	  	e.preventDefault();

  	let that = this;
    const googleBooksUrl = 'https://www.googleapis.com/books/v1?key=AIzaSyDJq43DKyz36PwuZu9EOMLvbocgHn8FTsM/volumes?q=';
    let startIndex = 1;
    const maxStartIndex = 161;

    const list = document.getElementsByClassName("list")[0];
    let lastChild = list.lastElementChild;

	// removes all books
    while(lastChild) {
    	list.removeChild(lastChild);
    	lastChild = list.lastElementChild;
    }

    function searchTenBooks(startIndex) {
    	if (startIndex < maxStartIndex) {
    		// every 40 books, a break is created that links to google books
    		if (startIndex !== 1) {
	    		let googleLink = document.createElement("a");
	    		let googleLinkNode = document.createTextNode("Find more books here");
	    		googleLink.appendChild(googleLinkNode);
				googleLink.href = 'https://books.google.com';
				googleLink.target = '_blank';
	    		googleLink.className = "api-link-block";
	    		list.appendChild(googleLink);
    		}

    		// accesses the google books api
    		console.log("fetched");
		    fetch(`https://www.googleapis.com/books/v1/volumes?key=${process.env.REACT_APP_GOOGLE_BOOKS_API}&q=${that.state.queryWithPlus}&maxResults=40&startIndex=` + startIndex)
		      .then(res => res.json())
		      .then((result) => {
		      	  // as long as there are items in the api and the max has not been reached, create an element for each book
		          if(result.items) {
		          	for(let i = 0; i < result.items.length; i++) {

		          	  let information = result.items[i].volumeInfo;

					  // create book
					  let book = document.createElement("div");
					  book.className = "book";

					  // create title
			          let bookTitle = document.createElement("div");
			          let bookTitleNode = document.createTextNode("No title available");
			          if(information.title) {
			          	bookTitleNode = document.createTextNode(information.title);
			          }
			          bookTitle.appendChild(bookTitleNode);
			          bookTitle.className = "book-title";
			          book.appendChild(bookTitle);	

					  // create thumbnail and add link
					  let bookThumbnailContainer = document.createElement("a");
					  bookThumbnailContainer.href = '';
					  if(information.infoLink) {
					  	bookThumbnailContainer.href = information.infoLink;
					  	bookThumbnailContainer.target = '_blank';
					  }
					  bookThumbnailContainer.className = "book-thumbnail-container";
			          let bookThumbnail = document.createElement("img");
			          bookThumbnail.src = 'https://cdn.pixabay.com/photo/2018/06/26/01/20/connection-lost-3498366_1280.png';
			          if(information.imageLinks) {
			          	bookThumbnail.src = information.imageLinks.thumbnail;
			          } else {
			          	bookThumbnail.style.height = '190px';
			          }
					  bookThumbnailContainer.appendChild(bookThumbnail);		          
			          book.appendChild(bookThumbnailContainer);

					  // create a container for author and publisher
					  let bookOtherInformationContainer = document.createElement("div");
					  bookOtherInformationContainer.className = "book-other-information-container";
					  // create author
			          let bookAuthor = document.createElement("div");
			          let bookAuthorNode = document.createTextNode("author unknown");
			          if(information.authors) {
			          	bookAuthorNode = document.createTextNode("by " + information.authors);
			          }
			          bookAuthor.appendChild(bookAuthorNode);
			          bookAuthor.className = "book-author";
			          bookOtherInformationContainer.appendChild(bookAuthor);		          	          
			          // create publisher
			          let bookPublisher = document.createElement("div");
			          let bookPublisherNode = document.createTextNode("\n Publisher: unknown");
			          if(information.publisher) {
			          	bookPublisherNode = document.createTextNode("\n Publisher: " + information.publisher);
			          }
			          bookPublisher.appendChild(bookPublisherNode);
			          bookPublisher.className = "book-publisher";
			          bookOtherInformationContainer.appendChild(bookPublisher);
			          book.appendChild(bookOtherInformationContainer);

				      // TODO: utilize other information
				      // let genres = [];
				      // let informations = [];
					  // genre: json.items[i].volumeInfo.categories
					  // info: json.items[i].volumeInfo.searchInfo.textSnippet
	         		          		          		          
			          list.appendChild(book);
			        }

			        // recursively calls the api for 40 books
		          	startIndex += 40;
		          	searchTenBooks(startIndex);
		          }
		        });
    	}

	}

	// initiates the api call
	searchTenBooks(startIndex);
  }

  // as a user inputs their query, states are updated
  handleQueryChange(event) {
  	let searchBox = document.getElementsByClassName("search-box")[0];
	let queryWithPlus = event.target.value.replace(/ /g, '+');
	let that = this;

	this.setState({ query: event.target.value,
		queryWithPlus: queryWithPlus });

	// waits for user to stop typing
	searchBox.onkeyup = function (e) {
	    clearTimeout(that.timeout);

	    that.timeout = setTimeout(function () {
	        that.searchBooks(e);
	    }, 700);
	};

	// adds and removes watermark
  	if (!event.target.value) {
		searchBox.style.background = "";
  	} else {
  		searchBox.style.background = "white";
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
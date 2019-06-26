import React, {Component} from 'react';

class Search  extends Component {

  constructor(props) {
  	super(props)
    this.state = {
      query: '',
      queryWithPlus: ''
  	}

    // binding functions
    this.searchBooks = this.searchBooks.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.createTitle = this.createTitle.bind(this);
    this.createThumbnail = this.createThumbnail.bind(this);
    this.createAuthor = this.createAuthor.bind(this);
    this.createPublisher = this.createPublisher.bind(this);
    this.createOtherInformation = this.createOtherInformation.bind(this);
    this.createBooks = this.createBooks.bind(this);
    this.searchNextBooks = this.searchNextBooks.bind(this);

    this.timeout = null;
    this.startIndex = 1;
    // the google books api limits the amount of calls to 1000 per day, maxStartIndex prevents too many calls
    this.maxStartIndex = 161;
    // the google books api limits the call to 40 books per call
    this.changeIndex = 40;
    this.list = document.getElementsByClassName("list")[0];
  }

  // creates a new element for the title and appends to the book
  createTitle(book, title) {
	let bookTitle = document.createElement("div");
	let bookTitleNode = document.createTextNode("No title available");
	if(title) {
    bookTitleNode = document.createTextNode(title);
	}
	bookTitle.appendChild(bookTitleNode);
	bookTitle.className = "book-title";
	book.appendChild(bookTitle);
  }

  // creates a new element for the thumbnail and a link to more information and appends to the book
  createThumbnail(book, information) {
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
  }

  // creates a new element for the author and appends to the OtherInformation
  createAuthor(bookOtherInformationContainer, information) {
    let bookAuthor = document.createElement("div");
    let bookAuthorNode = document.createTextNode("author unknown");
    if(information.authors) {
      bookAuthorNode = document.createTextNode("by " + information.authors);
    }
    bookAuthor.appendChild(bookAuthorNode);
    bookAuthor.className = "book-author";
    bookOtherInformationContainer.appendChild(bookAuthor);
  }
  
  // creates a new element for the publisher and appends to the OtherInformation
  createPublisher(bookOtherInformationContainer, information) {
    let bookPublisher = document.createElement("div");
    let bookPublisherNode = document.createTextNode("\n Publisher: unknown");
    if(information.publisher) {
      bookPublisherNode = document.createTextNode("\n Publisher: " + information.publisher);
    }
    bookPublisher.appendChild(bookPublisherNode);
    bookPublisher.className = "book-publisher";
    bookOtherInformationContainer.appendChild(bookPublisher);
  }

  // creates a new element for other information and appends to the book
  createOtherInformation(book, information) {
  	let that = this;
  	let bookOtherInformationContainer = document.createElement("div");
  	bookOtherInformationContainer.className = "book-other-information-container";
  	that.createAuthor(bookOtherInformationContainer, information);	          	          
    that.createPublisher(bookOtherInformationContainer, information);
    book.appendChild(bookOtherInformationContainer);
  }

  // creates books and appends them to the list
  createBooks(result, list) {
    let that = this;
    if(result.items) {
      for(let i = 0; i < result.items.length; i++) {
      	let information = result.items[i].volumeInfo;

		    let book = document.createElement("div");
		    book.className = "book";

		    that.createTitle(book, information.title);
		    that.createThumbnail(book, information);
		    that.createOtherInformation(book, information);
 		          		          		          
        list.appendChild(book);
      }

      // recursively calls the api for the next set of books
      that.startIndex += that.changeIndex;
      that.searchNextBooks(that.startIndex, list);
    }
  }

  searchNextBooks(startIndex, list) {
    let that = this;
    if (that.startIndex < that.maxStartIndex) {
      // after every set of books, a break is created that links to google books
      if (that.startIndex !== 1) {
        let googleLink = document.createElement("a");
        let googleLinkNode = document.createTextNode("Find more books here");
        googleLink.appendChild(googleLinkNode);
  	    googleLink.href = 'https://books.google.com';
  	    googleLink.target = '_blank';
        googleLink.className = "api-link-block";
        list.appendChild(googleLink);
      }

    	// accesses the google books api
      const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?`;
      const googleBooksAPIUrlKey = `key=${process.env.REACT_APP_GOOGLE_BOOKS_API}`;
      const googleBooksAPIUrlQuery = `q=${that.state.queryWithPlus}`;
      const googleBooksAPIUrlMaxResults = `maxResults=40&startIndex=` + that.startIndex;

      
    	fetch(googleBooksAPIUrl + googleBooksAPIUrlKey + `&` + googleBooksAPIUrlQuery + `&` + googleBooksAPIUrlMaxResults)
    	  .then(res => res.json())
    	  .then((result) => {
    	  	// as long as there are items in the api and the max has not been reached, 
          // create an element for each book
    	  	that.createBooks(result, list);
    	  });
    }
  }

  // removes all books, calls the google books api, and renders a set of books in the list
  searchBooks(event) {

  	// prevents the form from refreshing page
  	if(event) {
      event.preventDefault();
    }

  	let that = this;
  	that.startIndex = 1;
  	let list = document.getElementsByClassName("list")[0];
    let lastChild = list.lastElementChild;

	  // removes all books
    while(lastChild) {
      list.removeChild(lastChild);
      lastChild = list.lastElementChild;
    }

  	// searches the google books api for the first set of books
  	that.searchNextBooks(that.startIndex, list);
  }

  // updates the query using states to dynamically call the api
  handleQueryChange(event) {
    let that = this;
  	let searchBox = document.getElementsByClassName("search-box")[0];
  	let queryWithPlus = event.target.value.replace(/ /g, '+');

  	that.setState({ query: event.target.value,
  	  queryWithPlus: queryWithPlus });

  	// waits for user to stop typing, prevents calling the api too many times
  	searchBox.onkeyup = function (event) {
  	  clearTimeout(that.timeout);

  	  that.timeout = setTimeout(function () {
  	    that.searchBooks(event);
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
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { mount } from 'enzyme';

import { createTitle, createThumbnail, createAuthor, createPublisher, createOtherInformation, createBooks } from './book/createBooks.js';
import { searchBooks, searchNextBooks } from './search/searchBooks.js';
import { removeBooks } from './book/removeBooks.js';
import { createGoogleLink } from './book/createGoogleLink.js';
import { createNoResults } from './book/createNoResults.js';
import { handleQueryChange, removeWatermark } from './search/handleQueryChange.js';
import Search from './search/Search.jsx';

describe("testRenders", () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("testCreateBooks", () => {
  let list;
  let testBook;
  let bookOtherInformationContainer;
  let result;
  let expectedData;

  beforeEach(function() {
  	document.body.innerHTML =
      '<div>' +
      '  <div class="list">' +
      '  <div />' +
      '</div>';
    list = document.getElementsByClassName("list")[0];
	testBook = document.createElement("div");
	testBook.className = "test-book";
	bookOtherInformationContainer = document.createElement("div");
	result = {
	  items: [
	  	{
	  	  volumeInfo: {
	  	  	title: "Harry Potter and the Chamber of Secrets",
	  	  	infoLink: "https://books.google.com/books?id=DQQhCwAAQBAJ&dq=harry+potter+and+the+chamber&hl=en&source=gbs_api",
	  	  	imageLinks: {
	  	  	  thumbnail: "http://books.google.com/books/content?id=DQQhCwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
	  	  	},
	  	  	authors: "J. K. Rowling",
	  	  	publisher: "Pottermore Publishing",
	  	  }
	  	}
	  ]
	}
    expectedData = result.items[0].volumeInfo;
  });

  describe("testCreateTitle", () => {
    test("should create a title and append it to a book", () => {
	  createTitle(testBook, expectedData.title);
	  list.appendChild(testBook);
	  let testTitle = document.getElementsByClassName("book-title")[0].textContent;

	  expect(testTitle).toBe(expectedData.title);
    });
  });

  describe("testCreateThumbnail", () => {
  	test("should create a new element for the thumbnail and a link to more information and appends to the book", () => {
  	  createThumbnail(testBook, expectedData);
  	  list.appendChild(testBook);
  	  let testBookThumbnailContainer = document.getElementsByClassName("book-thumbnail-container")[0];

  	  expect(testBookThumbnailContainer.href).toBe(expectedData.infoLink);
  	  expect(testBookThumbnailContainer.firstChild.src).toBe(expectedData.imageLinks.thumbnail);
  	})
  });

  describe("testCreateAuthor", () => {
	test("should create a new element for the author and appends to the OtherInformation", () => {
	  createAuthor(bookOtherInformationContainer, expectedData);
	  list.appendChild(bookOtherInformationContainer);
	  let testAuthor = document.getElementsByClassName("book-author")[0].textContent;

	  expect(testAuthor).toBe("by " + expectedData.authors);
	});
  });

  describe("testCreatePublisher", () => {
  	test("should create a new element for the publisher and appends to the OtherInformation", () => {
  	  createPublisher(bookOtherInformationContainer, expectedData);
  	  list.appendChild(bookOtherInformationContainer);
  	  let testBookPublisher = document.getElementsByClassName("book-publisher")[0].textContent;

  	  expect(testBookPublisher).toBe("\n Publisher: " + expectedData.publisher);
  	})
  });

  describe("testCreateOtherInformation", () => {
  	test("should create a new element for other information and appends to the book", () => {
  	  createOtherInformation(testBook, expectedData);
  	  list.appendChild(testBook);
  	  let testAuthor = document.getElementsByClassName("book-author")[0].textContent;
  	  let testBookPublisher = document.getElementsByClassName("book-publisher")[0].textContent;
  	  let testBookOtherInformationContainer = document.getElementsByClassName("book-other-information-container")[0];

	  expect(testAuthor).toBe("by " + expectedData.authors);
	  expect(testBookPublisher).toBe("\n Publisher: " + expectedData.publisher);
	  expect(testBookOtherInformationContainer).toBeDefined();
  	});
  });

  describe("testCreateBooks", () => {
  	test("should create books and appends them to the list", () => {
	  function testCreateBooks() {
		this.startIndex = 1;
		this.maxStartIndex = 1;
		this.createBooks = createBooks.bind(this);
		this.searchNextBooks = searchNextBooks.bind(this);
	  }

	  let testCreateBooksCode = new testCreateBooks();
	  testCreateBooksCode.createBooks(result, list);
	  let testTitle = document.getElementsByClassName("book-title")[0].textContent;
	  let bookThumbnailContainer = document.getElementsByClassName("book-thumbnail-container")[0];
	  let testAuthor = document.getElementsByClassName("book-author")[0].textContent;
	  let testBookPublisher = document.getElementsByClassName("book-publisher")[0].textContent;
	  let testBookOtherInformationContainer = document.getElementsByClassName("book-other-information-container")[0];

	  expect(testTitle).toBe(expectedData.title);
	  expect(bookThumbnailContainer.href).toBe(expectedData.infoLink);
  	  expect(bookThumbnailContainer.firstChild.src).toBe(expectedData.imageLinks.thumbnail);
	  expect(testAuthor).toBe("by " + expectedData.authors);
	  expect(testBookPublisher).toBe("\n Publisher: " + expectedData.publisher);
	  expect(testBookOtherInformationContainer).toBeDefined();

  	});
  });
});

describe("testSearchBooks", () => {
  let list;

  beforeEach(function() {
  	document.body.innerHTML =
      '<div>' +
      '  <div class="list">' +
      '  <div />' +
      '</div>';
    list = document.getElementsByClassName("list")[0];
  });

  describe("testSearchNextBooks", () => {
    test("should call the google books api, creates books upon success",
      async () => {
        function testSearchNextBooks() {
		  this.startIndex = 1;
		  this.maxStartIndex = 2;
		  this.state = {};
		  this.state.queryWithPlus = "Harry+Potter";
		  this.createBooks = createBooks.bind(this);
		  this.searchNextBooks = searchNextBooks.bind(this);
	    }

	    let testSearchNextBooksCode = new testSearchNextBooks();
        await testSearchNextBooksCode.searchNextBooks(list);
	    let testBook = document.getElementsByClassName("book")[0];

	    expect(testBook).toBeDefined();
      }
    );
  });

  describe("testSearchBooks", () => {
  	test("should start searchNextBooks", async () => {
	  function testSearchBooks() {
		this.startIndex = 1;
		this.maxStartIndex = 1;
		this.state = {};
		this.state.queryWithPlus = "Harry+Potter";
		this.createBooks = createBooks.bind(this);
		this.searchNextBooks = searchNextBooks.bind(this);
		this.searchBooks = searchBooks.bind(this);
		this.removeBooks = removeBooks.bind(this);
	  }

	  let testSearchBooksCode = new testSearchBooks();
	  testSearchBooksCode.searchNextBooks = jest.fn();
	  testSearchBooksCode.removeBooks = jest.fn();
	  var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	  });
	  await testSearchBooksCode.searchBooks(evt);

	  expect(testSearchBooksCode.searchNextBooks).toHaveBeenCalled();
  	});
  });
});

describe("testCreateGoogleLink", () => {
  test("should create a link to google books", () => {
  	document.body.innerHTML =
      '<div>' +
      '  <div class="list">' +
      '  <div />' +
      '</div>';
    let list = document.getElementsByClassName("list")[0];
    createGoogleLink(list);
    let googleLink = document.getElementsByClassName("api-link-block")[0];
    
    expect(googleLink.textContent).toBe("Find more books here"); 
    expect(googleLink.href).toBe("https://books.google.com/");
  });
});

describe("testCreateNoResults", () => {
  test("should create a no results div and append to the list", () => {
  	document.body.innerHTML =
      '<div>' +
      '  <div class="list">' +
      '  <div />' +
      '</div>';
    let list = document.getElementsByClassName("list")[0];
    let error = "ERROR: No Results";
    createNoResults(list, error);
    let noResults = document.getElementsByClassName("no-results")[0];

    expect(noResults.textContent).toBe("Inconclusive search, please try searching again." + error); 
  });
});

describe("testHandleQueryChange", () => {
  let list;
  let event;
  let watermarkBackground;

  beforeEach(function() {
  	document.body.innerHTML =
      '<div>' +
      '<input type="text" name="search" class="search-box" onkeyup="true"></input>' +
      '  <div class="list">' +
      '  <div />' +
      '</div>';
    list = document.getElementsByClassName("list")[0];
    watermarkBackground = document.getElementsByClassName("search-box")[0];
  	event = {
	  target: {
	  	value: "Harry+Potter"
	  }
	};
  });

  describe("testHandleQueryChange", () => {
  	test("should update the query using states to dynamically call the api", () => {
      const wrapper = mount(<Search />);

	  function testHandleQueryChange() {
		this.startIndex = 1;
		this.maxStartIndex = 1;
		this.timeout = null;
        this.timeoutForQuery = 700;
		this.state = {};
		this.state.queryWithPlus = "Harry+Potter";
		this.createBooks = createBooks.bind(this);
		this.searchNextBooks = searchNextBooks.bind(this);
		this.searchBooks = searchBooks.bind(this);
		this.removeBooks = removeBooks.bind(this);
		this.handleQueryChange = handleQueryChange.bind(this);
		this.setState = function() {
    	  wrapper.setState({ query: "Harry Potter" });		  	
		};
	  }

	  let testHandleQueryChangeCode = new testHandleQueryChange();
      testHandleQueryChangeCode.handleQueryChange(event);

      expect(wrapper.state().query).toBe("Harry Potter");
    });
  });

  describe("testRemoveWatermark", () => {
    test("should make background of watermark white when the input is not empty", () => {
      removeWatermark(event, watermarkBackground);
      
      expect(watermarkBackground.style.background).toBe("white");
    });
  });
});
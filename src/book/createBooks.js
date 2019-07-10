import {createNoResults} from "./createNoResults.js";

// creates books and appends them to the list
export function createBooks(result, list) {
  let that = this;
  if(result.items) {
    for(let i = 0; i < result.items.length; i++) {
      let expectedData = result.items[i].volumeInfo;

      let book = document.createElement("div");
      book.className = "book";

      createTitle(book, expectedData.title);
      createThumbnail(book, expectedData);
      createOtherInformation(book, expectedData);
                                          
      list.appendChild(book);
    }

    // recursively calls the api for the next set of books
    that.startIndex += that.changeIndex;
    that.searchNextBooks(list);
  } else {
    let error = "ERROR: No Results";
    createNoResults(list, error);
  }
}

// creates a new element for the title and appends to the book
export function createTitle(book, title) {
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
export function createThumbnail(book, expectedData) {
  let bookThumbnailContainer = document.createElement("a");
	bookThumbnailContainer.href = '';
	if(expectedData.infoLink) {
	  bookThumbnailContainer.href = expectedData.infoLink;
	  bookThumbnailContainer.target = '_blank';
	}
	bookThumbnailContainer.className = "book-thumbnail-container";
  let bookThumbnail = document.createElement("img");
  bookThumbnail.src = 'https://cdn.pixabay.com/photo/2018/06/26/01/20/connection-lost-3498366_1280.png';
  if(expectedData.imageLinks) {
    bookThumbnail.src = expectedData.imageLinks.thumbnail;
  } else {
    bookThumbnail.style.height = '190px';
  }
	bookThumbnailContainer.appendChild(bookThumbnail);		          
  book.appendChild(bookThumbnailContainer);
}

// creates a new element for the author and appends to the OtherInformation
export function createAuthor(bookOtherInformationContainer, expectedData) {
  let bookAuthor = document.createElement("div");
  let bookAuthorNode = document.createTextNode("author unknown");
  if(expectedData.authors) {
    bookAuthorNode = document.createTextNode("by " + expectedData.authors);
  }
  bookAuthor.appendChild(bookAuthorNode);
  bookAuthor.className = "book-author";
  bookOtherInformationContainer.appendChild(bookAuthor);
}

// creates a new element for the publisher and appends to the OtherInformation
export function createPublisher(bookOtherInformationContainer, expectedData) {
  let bookPublisher = document.createElement("div");
  let bookPublisherNode = document.createTextNode("\n Publisher: unknown");
  if(expectedData.publisher) {
    bookPublisherNode = document.createTextNode("\n Publisher: " + expectedData.publisher);
  }
  bookPublisher.appendChild(bookPublisherNode);
  bookPublisher.className = "book-publisher";
  bookOtherInformationContainer.appendChild(bookPublisher);
}

// creates a new element for other information and appends to the book
export function createOtherInformation(book, expectedData) {
	let bookOtherInformationContainer = document.createElement("div");
	bookOtherInformationContainer.className = "book-other-information-container";
	createAuthor(bookOtherInformationContainer, expectedData);	          	          
  createPublisher(bookOtherInformationContainer, expectedData);
  book.appendChild(bookOtherInformationContainer);
}
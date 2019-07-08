import {removeBooks} from '../book/removeBooks.js';
import {createBooks} from '../book/createBooks.js';
import {createGoogleLink} from '../book/createGoogleLink.js';
import {createNoResults} from "../book/createNoResults.js";

export function searchBooks(event) {
  let that = this;
  let list = document.getElementsByClassName("list")[0];
  that.startIndex = 1;

  // prevents the form from refreshing page
  if(event) {
    event.preventDefault();
  }

  removeBooks(list);
  that.searchNextBooks(list);
}

export function searchNextBooks(list) {
  let that = this;
  console.log("searching for books", that.startIndex, that.maxStartIndex);
  if (that.startIndex < that.maxStartIndex) {

    if (that.startIndex !== 1) {
      createGoogleLink(list);
    }

    const googleBooksAPIUrl = `https://www.googleapis.com/books/v1/volumes?`;
    const googleBooksAPIUrlKey = `key=${process.env.REACT_APP_GOOGLE_BOOKS_API}`;
    const googleBooksAPIUrlQuery = `q=${that.state.queryWithPlus}`;
    const googleBooksAPIUrlMaxResults = `maxResults=40&startIndex=` + that.startIndex;
    
  	fetch(googleBooksAPIUrl + googleBooksAPIUrlKey + `&` + googleBooksAPIUrlQuery + `&` + googleBooksAPIUrlMaxResults)
  	  .then(res => res.json())
  	  .then((result) => {
  	  	that.createBooks(result, list);
  	  })
      .catch((error) => {
        console.error(error);
        createNoResults(list, error);
      });
  }
}
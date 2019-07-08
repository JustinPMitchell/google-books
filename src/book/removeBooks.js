// removes all books
export function removeBooks(list) {
  let lastBook = list.lastElementChild;

  while(lastBook) {
    list.removeChild(lastBook);
    lastBook = list.lastElementChild;
  }
}
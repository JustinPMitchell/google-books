// creates a link to google books
export function createGoogleLink(list) {
  let googleLink = document.createElement("a");
  let googleLinkNode = document.createTextNode("Find more books here");
  googleLink.appendChild(googleLinkNode);
  googleLink.href = 'https://books.google.com';
  googleLink.target = '_blank';
  googleLink.className = "api-link-block";
  list.appendChild(googleLink);
}
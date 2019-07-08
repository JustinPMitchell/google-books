// creates a link to google books
export function createNoResults(list, error) {
  let noResults = document.createElement("div");
  let noResultsNode = document.createTextNode("Inconclusive search, please try searching again.");
  let lineBreak = document.createElement("br");
  let errorMessageNode = document.createTextNode(error);
  noResults.appendChild(noResultsNode);
  noResults.appendChild(lineBreak);
  noResults.appendChild(errorMessageNode);
  noResults.className = "no-results";
  list.appendChild(noResults);
}
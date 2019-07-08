// updates the query using states to dynamically call the api
export function handleQueryChange(event) {
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
	}, that.timeoutForQuery);
  };

  removeWatermark(event, searchBox);
}

export function removeWatermark(event, watermarkBackground) {
  if (!event.target.value) {
    watermarkBackground.style.background = "";
  } else {
	watermarkBackground.style.background = "white";
  }  	
}
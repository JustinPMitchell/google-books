import React from 'react';

function Search() {
  return (
    <div className="Search">
      <form>
        <input type="text" name="search"></input>
        <input type="submit" value="search"></input>
      </form>
    </div>
  );
}

export default Search;
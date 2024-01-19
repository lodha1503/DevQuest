import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const searchClicked = () => {
    performSearch();
  };

  const performSearch = () => {
    fetchDataFromServer(searchQuery);
  };

  const fetchDataFromServer = (query) => {
    // Your logic to fetch data from the server goes here
    // Use fetch API or any other method to make an HTTP request
    // Example using fetch API:
    fetch(`/your-api-endpoint?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        // Process the data received from the server
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
      });
  };

  return (
    <div className="header_search">
      <div className="header_searchContainer">
        <input
          className="header_searchInput"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon className="header_searchIcon" onClick={searchClicked} />
      </div>
    </div>
  );
};

export default SearchBar;

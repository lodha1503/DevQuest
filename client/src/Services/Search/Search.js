import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Dummy from './Dummy';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  
  const handleKeyDown = (event) => {

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

  const fetchDataFromServer = async (query) => {
    
    await fetch(`http://localhost:5000/api/products/title/${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        
        navigate(`/api/products/title/${encodeURIComponent(query)}`);
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
        onKeyDown={handleKeyDown}
      />
        <SearchIcon className="header_searchIcon" onClick={searchClicked} />
      </div>
    </div>
  );
};

export default SearchBar;

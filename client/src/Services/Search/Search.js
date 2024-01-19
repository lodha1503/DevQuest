import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import Dummy from './Dummy';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
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

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/suggestions/${encodeURIComponent(query)}`);
      const suggestionsData = await response.json();
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error fetching suggestions from server:', error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300); // Adjust the debounce time (in milliseconds) as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

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
      {suggestions.length > 0 && (
        <div className="suggestionsContainer">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestionItem">
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

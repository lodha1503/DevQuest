import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import mic from '../../static/images/mic.png';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null); // Ref to the search container

  const recognitionRef = useRef(null);
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!recognition) {
    console.error('Speech recognition not supported');
    // Handle the lack of speech recognition support
  }

  useEffect(() => {
    recognitionRef.current = new recognition();

    if (!recognitionRef.current) {
      console.error('Speech recognition not supported');
      // Handle the lack of speech recognition support
      return;
    }

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop(); // Stop the recognition when the component unmounts
      }
    };
  }, [recognition]);

  useEffect(() => {
    // Handle clicks outside the search container
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
    try {
      const response = await fetch(`http://localhost:5000/api/products/title/${encodeURIComponent(query)}`);
      const data = await response.json();

      // Use the navigate function to redirect to the next component with the query parameter
      navigate(`api/products/title/${encodeURIComponent(query)}`, {
        state: { searchData: data }, // Pass the fetched data as state if needed
      });
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/suggestions/${encodeURIComponent(query)}`
      );
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
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSpeechButtonClick = () => {
    if (recognitionRef.current) {
      try {
        if (!isSpeechRecognitionActive) {
          recognitionRef.current.start();
        } else {
          recognitionRef.current.stop();
        }
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    fetchDataFromServer(suggestion);
  };

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onstart = () => {
        setIsSpeechRecognitionActive(true);
      };

      recognitionRef.current.onend = () => {
        setIsSpeechRecognitionActive(false);
      };
    }
  }, [isSpeechRecognitionActive]);

  return (
    <div className="header_search" ref={searchContainerRef}>
      <div className="header_searchContainer">
        <input
          className="header_searchInput"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        &nbsp;&nbsp;
        <SearchIcon className="header_searchIcon" onClick={searchClicked} />
        <button
          className={` ${isSpeechRecognitionActive ? 'redMic' : 'speechButton'}`}
          onClick={handleSpeechButtonClick}
        >
          <img className="mic" src={mic} alt="" />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestionsContainer">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestionItem"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

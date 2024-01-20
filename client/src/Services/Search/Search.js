import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import mic from "../../static/images/mic.png"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();


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

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
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
        await fetch(
            `http://localhost:5000/api/products/title/${encodeURIComponent(
                query
            )}`
        )
            .then((response) => response.json())
            .then((data) => {
                navigate(`/api/products/title/${encodeURIComponent(query)}`);
            })
            .catch((error) => {
                console.error("Error fetching data from server:", error);
            });
    };

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/products/suggestions/${encodeURIComponent(
                    query
                )}`
            );
            const suggestionsData = await response.json();
            setSuggestions(suggestionsData);
        } catch (error) {
            console.error("Error fetching suggestions from server:", error);
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchQuery.trim() !== "") {
                fetchSuggestions(searchQuery);
            } else {
                setSuggestions([]);
            }
        }, 300); // Adjust the debounce time (in milliseconds) as needed

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    const handleSpeechButtonClick = () => {
   
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start(); 
        } catch (error) {
          recognitionRef.current.stop();
        }
       // Stop the recognition before starting it again
         // Start the recognition when the speech button is clicked
      }
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
          &nbsp;&nbsp;
          <SearchIcon className="header_searchIcon" onClick={searchClicked} />
          <button className="speechButton" onClick={handleSpeechButtonClick}><img className='mic' src={mic} alt="" /></button>
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
  
  }

export default SearchBar;

import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleQueryInput = (event) => {
    setQuery(event.target.value);
    };
  const handleQuerySearch = (event) => {
    if (event.key === 'Enter' && query !== '') {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="searchBar">
      <input
        id="searchQueryInput"
        type="text"
        name="searchQueryInput"
        placeholder="Search"
        value={query}
        onChange={handleQueryInput}
        onKeyDown={handleQuerySearch}
      />
    </div>
  );
};

export default SearchBar;

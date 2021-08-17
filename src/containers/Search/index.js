import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import orderBy from 'lodash/orderBy';

import SearchInput from '../../components/SearchInput';
import SearchResult from '../../components/SearchResult.js';

const SearchModule = () => {
  const [inputValue, setInputvalue] = useState('');
  const [populated, setPopulated] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [activeSearchResult, setActiveSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [asc, setAsc] = useState(true);

  function handleChange(e) {
    setTouched(true);
    if (e.target.value.length == 0) setPopulated(false);
    if (!populated && e.target.value.length > 0) {
      setPopulated(true);
    }
    setInputvalue(e.target.value);
    // delayedLiveSearch(inputValue);
    // add debounce before handleSearch
  }

  function clearInput() {
    setPopulated(false);
    setInputvalue('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue == '') return false;
    handleSearch(inputValue);
  }

  async function handleSearch(q) {
    try {
      setIsSearching(true);
      let response = await await fetch(`http://localhost:4000/api/ships/${q}`);

      if (!response.ok) {
        throw new Error(`Ops! Houston we have a problem: ${response.status}`);
      }

      let data = await response.json();
      setIsSearching(false);
      setSearchResult(data);
    } catch (err) {
      setIsSearching(false);
      setError(true);
      console.log(err);
    }
  }

  function handleActiveSearchResult(clickedSearchResult) {
    const alreadyActive = activeSearchResult.some(
      (item) => item.shipId === clickedSearchResult.shipId
    );
    if (alreadyActive) {
      setActiveSearchResult(
        activeSearchResult.filter(
          (item) => item.shipId !== clickedSearchResult.shipId
        )
      );
    } else {
      setActiveSearchResult((activeSearchResult) => [
        ...activeSearchResult,
        clickedSearchResult
      ]);
    }
  }

  useEffect(() => {
    if (touched && inputValue != '') {
      delayedLiveSearch(inputValue);
    }
  }, [inputValue]);

  const delayedLiveSearch = useCallback(
    debounce((q) => handleSearch(q), 500),
    []
  );

  function handleSorting(param) {
    setAsc(!asc);
    const arr = orderBy(searchResult, [param], [asc ? 'asc' : 'desc']);
    setSearchResult(arr);
  }

  return (
    <>
      <SearchInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={inputValue}
        populated={populated}
        clearInput={clearInput}
      />
      <SearchResult
        data={searchResult}
        isSearching={isSearching}
        handleActiveSearchResult={handleActiveSearchResult}
        activeSearchResult={activeSearchResult}
        error={error}
        touched={touched}
        handleSorting={handleSorting}
      />
    </>
  );
};

export default SearchModule;

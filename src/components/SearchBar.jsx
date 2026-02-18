import React, { useState } from 'react'
import styles from '@css/SearchBar.module.css'
import { saveSearchTerm } from '@features/search/searchSlice';
import { useDispatch } from 'react-redux';

const SearchBar = ({ searchHandler }) => {
  // {, addTracks}

  const dispatch = useDispatch()
  const [term, setTerm] = useState('');


  // const [tracksFound, setTracksFound] = useState([])

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(saveSearchTerm(term))
    // TODO: dispatch the search term to a thunk to save tracks to our resultsSlice.

    // currently how we search for songs.
    searchHandler(term)
    setTerm('')
  };

  const handleChange = (e) => {
    setTerm(e.target.value)
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input 
        name='searchQuery'
        value={term}
        onChange={handleChange}
        className={styles.searchInput} 
        placeholder='Look up some tunes...'
      />
      <button className={styles.searchButton} type='submit'>Search</button>
    </form>
  )
}

export default SearchBar

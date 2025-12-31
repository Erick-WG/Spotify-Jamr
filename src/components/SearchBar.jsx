import React, { useState } from 'react'
import styles from '@css/SearchBar.module.css'

const SearchBar = ({ search }) => {
  // {, addTracks}
  const [term, setTerm] = useState('');
  // const [tracksFound, setTracksFound] = useState([])

  const handleSearch = (e) => {
    e.preventDefault();
    search(term)
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

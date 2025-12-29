import React, { useState } from 'react'
import styles from '@css/SearchBar.module.css'

const SearchBar = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm !== ''){
      search(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input 
        name='searchQuery'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput} 
        placeholder='Look up some tunes...'
        />
      <button 
        className={styles.searchButton}
        type='submit'
        >Search</button>
    </form>
  )
}

export default SearchBar

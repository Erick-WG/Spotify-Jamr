import React from 'react'
import styles from '@css/SearchBar.module.css'

const SearchBar = () => {
  return (
    <form className={styles.searchBar}>
      <input 
        name='searchQuery'
        value={''}
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

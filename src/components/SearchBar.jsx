import React from 'react'
import styles from '@css/SearchBar.module.css'

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input className={styles.searchInput} placeholder='Look up some tunes...'></input>
      <button className={styles.searchButton}>Search</button>
    </div>
  )
}

export default SearchBar

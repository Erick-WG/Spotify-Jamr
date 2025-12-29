import React from 'react'
import styles from '@css/App.module.css'

import TrackList from '@components/TrackList'

const SearchResults = ({searchTerm, tracks, addToPlaylist, saveUri}) => {
  return (
    <div className={styles.resultsContainer}>
      <TrackList searchTerm={searchTerm} tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri}/>
    </div>
  )
}

export default SearchResults

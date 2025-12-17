/* eslint-disable no-unused-vars */
// import { useState } from 'react'


// styling
import styles from '@css/App.module.css'


// components
import SearchBar from '@components/SearchBar.jsx'
import SearchResults from '@components/SearchResults.jsx'
import PlayList from '@components/PlayList.jsx'
import TrackList from '@components/TrackList.jsx'
import Track from '@components/Track.jsx'



// variables.
const url = 'https://api.spotify.com/v1/search?q='



function App() {
  

  return (
    <div>
      <div className={styles.logo}>
        <h1 style={{color: '#1db954'}}>Jam Tunr</h1>
      </div>
      <div className={styles.app}>
        <div className={styles.aside}>
          <PlayList />
        </div>

        <div className={styles.main}>
          <SearchBar />
          <h1 className={styles.heading}>Good music, good life</h1>
          {/* <SearchResults /> */}

          {/* results container */}
          <div className={styles.resultsContainer}>
            <TrackList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

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


// data
const tracks = [
  {
    id: 1,
    songName: 'Track One',
    artist: 'Artist A',
    album: 'Album Alpha'
  },
  {
    id: 2,
    songName: 'Track Two',
    artist: 'Artist B',
    album: 'Album Beta'
  },
  {
    id: 3,
    songName: 'Track Three',
    artist: 'Artist C',
    album: 'Album Gamma'
  },
  {
    id: 4,
    songName: 'Midnight Echo',
    artist: 'Luna Sky',
    album: 'Starlight Dreams'
  },
  {
    id: 5,
    songName: 'Electric Vibes',
    artist: 'Neon Pulse',
    album: 'Synthetic Waves'
  },
  {
    id: 6,
    songName: 'Ocean Breeze',
    artist: 'Coastal Tides',
    album: 'Sea Songs'
  },
  {
    id: 7,
    songName: 'Urban Jazz',
    artist: 'City Sounds',
    album: 'Metropolitan Groove'
  },
  {
    id: 8,
    songName: 'Forest Whispers',
    artist: 'Nature Calls',
    album: 'Woodland Tales'
  },
  {
    id: 9,
    songName: 'Neon Lights',
    artist: 'Synth Wave',
    album: 'Future Retro'
  },
  {
    id: 10,
    songName: 'Golden Hour',
    artist: 'Sunset Riders',
    album: 'Desert Dreams'
  },
  {
    id: 11,
    songName: 'Cosmic Journey',
    artist: 'Space Explorers',
    album: 'Beyond Horizons'
  },
  {
    id: 12,
    songName: 'Rhythm of Life',
    artist: 'Heartbeat Collective',
    album: 'Living Moments'
  },
  {
    id: 13,
    songName: 'Velvet Nights',
    artist: 'Smooth Operators',
    album: 'Late Night Sessions'
  },
  {
    id: 14,
    songName: 'Dancing Stars',
    artist: 'Celestial Beats',
    album: 'Galactic Grooves'
  },
  {
    id: 15,
    songName: 'Autumn Leaves',
    artist: 'Season Keepers',
    album: 'Through the Seasons'
  }
]




function App() {
  

  return (
    <div>
      <div className={styles.logo}>
        <h1>Jam Tunr</h1>
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
            <TrackList tracks={tracks}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

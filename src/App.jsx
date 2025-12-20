/* eslint-disable no-unused-vars */
import { useState } from 'react'


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
const tracksMockData = [
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
  // state to store fetched tracks to share with results then create a copy for playlist.
  const [tracks, setTracks] = useState(tracksMockData);

  // playlist tracks state, add a handler to add and remove tracks from playlist.
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // adding to playlist.
  const addToPlaylist = (track) => {
    // check if track is already in playlist
    if (playlistTracks.find((item) => item.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((item) => item.id !== track.id));
  };
  

  return (
    <div>
      <div className={styles.logo}>
        <h1>Jam Tunr</h1>
      </div>
      <div className={styles.app}>
        <div className={styles.asideContainer}>
          <div className={styles.aside}>
            {/* custon track list here to save to spotify. */}
            <PlayList tracks={playlistTracks} removeFromPlaylist={removeFromPlaylist} />
          </div>
          {/* TODO: future add, media player below the playlist */}
        </div>

        <div className={styles.main}>
          <SearchBar />
          <h1 className={styles.heading}>Good music, good life</h1>
          {/* <SearchResults /> */}

          {/* results container */}
          <div className={styles.resultsContainer}>
            <TrackList tracks={tracks} addToPlaylist={addToPlaylist} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

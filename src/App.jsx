/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'


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
    album: 'Album Alpha',
    uri: 'spotify:track:0000000000000000000001'
  },
  {
    id: 2,
    songName: 'Track Two',
    artist: 'Artist B',
    album: 'Album Beta',
    uri: 'spotify:track:0000000000000000000002'
  },
  {
    id: 3,
    songName: 'Track Three',
    artist: 'Artist C',
    album: 'Album Gamma',
    uri: 'spotify:track:0000000000000000000003'
  },
  {
    id: 4,
    songName: 'Midnight Echo',
    artist: 'Luna Sky',
    album: 'Starlight Dreams',
    uri: 'spotify:track:0000000000000000000004'
  },
  {
    id: 5,
    songName: 'Electric Vibes',
    artist: 'Neon Pulse',
    album: 'Synthetic Waves',
    uri: 'spotify:track:0000000000000000000005'
  },
  {
    id: 6,
    songName: 'Ocean Breeze',
    artist: 'Coastal Tides',
    album: 'Sea Songs',
    uri: 'spotify:track:0000000000000000000006'
  },
  {
    id: 7,
    songName: 'Urban Jazz',
    artist: 'City Sounds',
    album: 'Metropolitan Groove',
    uri: 'spotify:track:0000000000000000000007'
  },
  {
    id: 8,
    songName: 'Forest Whispers',
    artist: 'Nature Calls',
    album: 'Woodland Tales',
    uri: 'spotify:track:0000000000000000000008'
  },
  {
    id: 9,
    songName: 'Neon Lights',
    artist: 'Synth Wave',
    album: 'Future Retro',
    uri: 'spotify:track:0000000000000000000009'
  },
  {
    id: 10,
    songName: 'Golden Hour',
    artist: 'Sunset Riders',
    album: 'Desert Dreams',
    uri: 'spotify:track:0000000000000000000010'
  },
  {
    id: 11,
    songName: 'Cosmic Journey',
    artist: 'Space Explorers',
    album: 'Beyond Horizons',
    uri: 'spotify:track:0000000000000000000011'
  },
  {
    id: 12,
    songName: 'Rhythm of Life',
    artist: 'Heartbeat Collective',
    album: 'Living Moments',
    uri: 'spotify:track:0000000000000000000012'
  },
  {
    id: 13,
    songName: 'Velvet Nights',
    artist: 'Smooth Operators',
    album: 'Late Night Sessions',
    uri: 'spotify:track:0000000000000000000013'
  },
  {
    id: 14,
    songName: 'Dancing Stars',
    artist: 'Celestial Beats',
    album: 'Galactic Grooves',
    uri: 'spotify:track:0000000000000000000014'
  },
  {
    id: 15,
    songName: 'Autumn Leaves',
    artist: 'Season Keepers',
    album: 'Through the Seasons',
    uri: 'spotify:track:0000000000000000000015'
  }
]


function App() {
  // state to store fetched tracks to share with results then create a copy for playlist.
  const [tracks, setTracks] = useState(tracksMockData);



  //* playlist tracks state, add a handler to add and remove tracks from playlist.
  const [name, setName] = useState(null);
  const [uriList, setUriList] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // update the playlist by name.
  const updatePlaylistName = (name) => {
    setName(name);
  };

  // adding to playlist.
  const addToPlaylist = (track) => {
    // check if track is already in playlist
    if (playlistTracks.find((item) => item.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };


  // saving uri's for reference.
  const saveUri = (track) => {
    if(uriList.includes(track.uri)) {
      return;
    }
    setUriList([...uriList, track.uri]);
  }

  // deleting uri's for reference.
  const deleteUri = (track) => {
    setUriList(uriList.filter((uri) => uri !== track.uri));
  }

  // removing from playlist.
  const removeFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((item) => item.id !== track.id));
  };

  // end playlist handlers.
  

  return (
    <div>
      <div className={styles.logo}>
        <h1>Jam Tunr</h1>
      </div>
      <div className={styles.app}>
        <div className={styles.asideContainer}>
          <div className={styles.aside}>
            {/* custon track list here to save to spotify. */}
            <PlayList name={name} updatePlaylistName={updatePlaylistName} tracks={playlistTracks} removeFromPlaylist={removeFromPlaylist} deleteUri={deleteUri} />
          </div>
          {/* TODO: future add, media player below the playlist */}
        </div>

        <div className={styles.main}>
          <SearchBar />
          <h1 className={styles.heading}>Good music, good life</h1>
          {/* <SearchResults /> */}

          {/* results container */}
          <div className={styles.resultsContainer}>
            <TrackList tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

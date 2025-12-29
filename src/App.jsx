/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'


// styling
import styles from '@css/App.module.css'


// components
import SearchBar from '@components/SearchBar.jsx'
import SearchResults from '@components/SearchResults'
import PlayList from '@components/PlayList.jsx'
import TrackList from '@components/TrackList.jsx'
import Header from '@components/Header'



// variables.
// const url = 'https://api.spotify.com/v1/search?q='


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

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

if (code) {
  window.localStorage.setItem('auth_code', code);
  window.history.replaceState({}, '', window.location.pathname);
} else {
  code = window.localStorage.getItem('auth_code');
}


function App() {
  //* Access Token.
  // get access token through authorization code flow with PKCE.
  // use a login button to trigger the getAuth function from apiClient so we can have an auth code we can exchange for an access token.
  // store the access token in local storage for use in fetch requests.
  // const accessToken = localStorage.getItem('access_token');

  // get auth token first and store it locally
  // useEffect hook allows us to get the auth code and code verifyer on first load of the app.
  useEffect(() => {
    import('@apiClient/authCodes.js').then(({ default: getAuth }) => {
      if (code == undefined && code == null) {
        getAuth()
      }
    });
  }, []);

  // Auth and access token states.
  const [loginStatus, setLoginStatus] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  
  //* States.

  // search term state to pass to search bar and use in fetch.
  // add the search term to the fetch URL to get real data from Spotify API.
  // data retrieval and state update logic will be needed.
  // pass data to tracks state so that our app can render real search results.
  const [searchTerm, setSearchTerm] = useState('');


  // state to store fetched tracks to share with results then create a copy for playlist.
  const [tracks, setTracks] = useState(tracksMockData);


  //* playlist tracks state, add a handler to add and remove tracks from playlist.
  const [playlistName, setPlaylistName] = useState(null);
  const [uriList, setUriList] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);


  //* Handlers. 

  // login handler to trigger getToken function.
  // we can get an access token when the user chooses to login
  const handleLogin = () => {

    //* login to get the access token to fetch data 
    if (code !== undefined || code !== null) {
      import('@/apiClient/getToken.js').then(({ default: getToken }) => {
        getToken(code)
        setLoginStatus(true);
      });
    }
  };

  // clearing the local storage on logout 
  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setLoginStatus(false);
    window.location.href = '/';
  };

  // search handlers here.
  const handleSearch = (term) => {
    // getting and saving access token from the local storage to our app.
    const access_token = window.localStorage.getItem('access_token')
    

    if(access_token){
      setAccessToken(access_token)
      console.log(access_token)
    }
    console.log(accessToken)
    setSearchTerm(term);
  };


  // playlist handlers.

  // update the playlist by name.
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
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

  // deleting uri's when a song is removed from the saved playlist.
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
      <Header isLogin={loginStatus} handleLogin={handleLogin} handleLogout={handleLogout} />
      <div className={styles.app}>
        <div className={styles.asideContainer}>
          <div className={styles.aside}>
            {/* custon track list here to save to spotify. */}
            <PlayList name={playlistName} updatePlaylistName={updatePlaylistName} tracks={playlistTracks} removeFromPlaylist={removeFromPlaylist} deleteUri={deleteUri} />
          </div>
          {/* TODO: future add, media player below the playlist */}
        </div>

        <div className={styles.main}>
          <SearchBar search={handleSearch} />
          <h1 className={styles.heading}>Good music, good life</h1>

          <SearchResults searchTerm={searchTerm} tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri}/>

          {/* results container */}
          {/* <div className={styles.resultsContainer}>
            <TrackList tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri} />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default App

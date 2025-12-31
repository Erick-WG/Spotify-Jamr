/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'


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
    name: 'Track One',
    artist: 'Artist A',
    album: 'Album Alpha',
    uri: 'spotify:track:0000000000000000000001'
  },
  {
    id: 2,
    name: 'Track Two',
    artist: 'Artist B',
    album: 'Album Beta',
    uri: 'spotify:track:0000000000000000000002'
  },
  {
    id: 3,
    name: 'Track Three',
    artist: 'Artist C',
    album: 'Album Gamma',
    uri: 'spotify:track:0000000000000000000003'
  },
  {
    id: 4,
    name: 'Midnight Echo',
    artist: 'Luna Sky',
    album: 'Starlight Dreams',
    uri: 'spotify:track:0000000000000000000004'
  },
  {
    id: 5,
    name: 'Electric Vibes',
    artist: 'Neon Pulse',
    album: 'Synthetic Waves',
    uri: 'spotify:track:0000000000000000000005'
  },
  {
    id: 6,
    name: 'Ocean Breeze',
    artist: 'Coastal Tides',
    album: 'Sea Songs',
    uri: 'spotify:track:0000000000000000000006'
  },
  {
    id: 7,
    name: 'Urban Jazz',
    artist: 'City Sounds',
    album: 'Metropolitan Groove',
    uri: 'spotify:track:0000000000000000000007'
  },
  {
    id: 8,
    name: 'Forest Whispers',
    artist: 'Nature Calls',
    album: 'Woodland Tales',
    uri: 'spotify:track:0000000000000000000008'
  },
  {
    id: 9,
    name: 'Neon Lights',
    artist: 'Synth Wave',
    album: 'Future Retro',
    uri: 'spotify:track:0000000000000000000009'
  },
  {
    id: 10,
    name: 'Golden Hour',
    artist: 'Sunset Riders',
    album: 'Desert Dreams',
    uri: 'spotify:track:0000000000000000000010'
  },
  {
    id: 11,
    name: 'Cosmic Journey',
    artist: 'Space Explorers',
    album: 'Beyond Horizons',
    uri: 'spotify:track:0000000000000000000011'
  },
  {
    id: 12,
    name: 'Rhythm of Life',
    artist: 'Heartbeat Collective',
    album: 'Living Moments',
    uri: 'spotify:track:0000000000000000000012'
  },
  {
    id: 13,
    name: 'Velvet Nights',
    artist: 'Smooth Operators',
    album: 'Late Night Sessions',
    uri: 'spotify:track:0000000000000000000013'
  },
  {
    id: 14,
    name: 'Dancing Stars',
    artist: 'Celestial Beats',
    album: 'Galactic Grooves',
    uri: 'spotify:track:0000000000000000000014'
  },
  {
    id: 15,
    name: 'Autumn Leaves',
    artist: 'Season Keepers',
    album: 'Through the Seasons',
    uri: 'spotify:track:0000000000000000000015'
  }
]

// Get the auth token from the url (, save it to local storage) when our app refreshes after users grant access permission and clear the code from the url.
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
      // only triger the access request when we don't have an auth token we can exchange for an access token.
      if (code == undefined && code == null) {
        getAuth()
      }
    });
  }, []);



  //* States.


  // Auth and access token states.
  const [loginStatus, setLoginStatus] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  

  // search term state to pass to search bar and use in fetch.
  // add the search term to the fetch URL to get real data from Spotify API.
  // data retrieval and state update logic will be needed.
  // pass data to tracks state so that our app can render real search results.
  const [searchTerm, setSearchTerm] = useState('');


  // state to store fetched tracks to share with results then create a copy for playlist.
  const [tracks, setTracks] = useState([]);


  //* playlist tracks state, add a handler to add and remove tracks from playlist.
  const [playlistName, setPlaylistName] = useState('');
  const [uriList, setUriList] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);


  //* Handlers. 

  // login handler to trigger getToken function.
  // we can get an access token when the user chooses to login to our app.
  const handleLogin = () => {

    // TODO: set login status to true if an access token has not expired.

    //* login to get the access token to fetch data 
    if (code !== undefined || code !== null) {

      // TODO: Authenticate only when we don't have an auth token and the access token has expired. 
      import('@/apiClient/getToken.js').then(({ default: getToken }) => {

        // async call to get an access token
        getToken(code).then(token => setAccessToken(token)).catch(error => console.log(error.message))
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
  const handleSearch = async (term) => {
    // getting and saving access token from the local storage to our app.
    setSearchTerm(term)
    const access_token = window.localStorage.getItem('access_token')

    if (!term || !accessToken) return;

    // fetching tracks only when we have an access token and a term
    try {
      const endpoint = 'https://api.spotify.com/v1/search?'
      const requestUrl = new URLSearchParams({
        q: term,
        type: 'track',
        limit: 5
      })
      const request = endpoint + requestUrl.toString()
      const response = await fetch(request, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const data = await response.json()
      const handleTracks = (array) => {
        if (array.length > 0){
          array.map((track, index) => {
            // destructuring track objects to get the required data for our app.
            const {id, name, artists, album, uri} = track
            let song = {
              number: index,
              id,
              name,
              artists,
              album,
              uri
            } 
            console.log(song)
            setTracks((songs)=>([...songs, song]))
          })
        }
      }
      handleTracks(data.tracks.items)
    } catch (error) {
      console.error('Fetch error:', error.message)
    }
  };
  // end search hanler


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
          <SearchBar searchTerm={searchTerm} search={handleSearch} accessToken={accessToken}/>
          <h1 className={styles.heading}>Good music, good life</h1>

          {tracks && <SearchResults searchTerm={searchTerm} tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri}/>}

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

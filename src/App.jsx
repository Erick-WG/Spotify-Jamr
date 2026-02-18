/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, use } from 'react'


// styling
import styles from '@css/App.module.css'


// components
import SearchBar from '@components/SearchBar.jsx'
import SearchResults from '@components/SearchResults'
import PlayList from '@components/PlayList.jsx'
// import TrackList from '@components/TrackList.jsx'
import Header from '@components/Header'


// import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthCode } from '@features/access/accessSlice' 
import { selectAccessToken } from '@features/access/accessSlice'



function App() {
  //* States.
  
  //* Auth and access token states.
  const code = useSelector(selectAuthCode)
  const accessToken = useSelector(selectAccessToken)


  const [user, setUser] = useState('')
  const [loginStatus, setLoginStatus] = useState(false);


  //* search term state to pass to search bar and use in fetch.
  // add the search term to the fetch URL to get real data from Spotify API.
  // data retrieval and state update logic will be needed.
  // pass data to tracks state so that our app can render real search results.
  const [searchTerm, setSearchTerm] = useState('');


  //* state to store fetched tracks to share with results then create a copy for playlist.
  const [tracks, setTracks] = useState([]);


  //* playlist tracks state, add a handler to add and remove tracks from playlist.
  const [saved, setSaved] = useState(false)
  const [playlistName, setPlaylistName] = useState('');
  const [uriList, setUriList] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);



  //** Get an auth token when we don't have one and then fetch the user name once we have an access token. */
  useEffect(() => {

    // get user profile only when the access token is available.
    async function getProfile (){
      if(accessToken){
        try{
          const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
          });
          if(!response.ok) return
          const data = await response.json()
          const profileName = data.display_name
          const userId = data.id

          // saving the username
          setUser({name: profileName, id: userId})
        } catch (error){
          console.log(error.message)
        }
      }
    }

    getProfile()


  }, [accessToken, code]);


  //* Handlers. 

  // login handler to trigger getToken function.
  // we can get an access token when the user chooses to login to our app.
  if(accessToken){
    setLoginStatus(true)
  }

  // clearing the local storage on logout 
  const handleLogout = () => {
    localStorage.clear();
    // setAccessToken(null);
    setLoginStatus(false);
    window.location.href = '/';
  };

  // search handlers here.
  const handleSearch = async (term) => {
    // getting and saving access token from the local storage to our app.
    setSearchTerm(term)
    setTracks([])
    const access_token = window.localStorage.getItem('access_token')

    if (!term || !accessToken) return;

    // fetching tracks only when we have an access token and a search term
    try {
      const endpoint = 'https://api.spotify.com/v1/search?'
      const requestUrl = new URLSearchParams({
        q: term,
        type: 'track',
        limit: 20
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

      // extracting the data we need from the response and saving it to our tracks state.
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
            setTracks((songs)=>[...songs, song])
          })
        }
      }

      // adding the fetched tracks to our tracks state to share with the search results component.
      handleTracks(data.tracks.items)
      console.log(data.tracks.items)
    } catch (error) {
      console.error('Fetch error:', error.message)
    }
  };
  // end search handler


  // playlist handlers.
  
  // saving a playlistName
  const savePlaylistName = useCallback(async (name) => {
    if (!accessToken || !user.id) return;
    const endpoint = `https://api.spotify.com/v1/users/${user.id}/playlists`
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'Playlist saved with Jam tunr',
        public: false
      })
    }

    try {
      const response = await fetch(endpoint, params)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      setPlaylistName({ name: name, id: data.id })

    } catch (error) {
      console.log(error.message)
    }
  }, [accessToken, user.id])


  // updating playlist names.
  const updatePlaylistName = useCallback(async (name, id) => {
    if (!accessToken || !id) return;
    
    const endpoint = `https://api.spotify.com/v1/playlists/${id}`
    const params = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'Jam tunr',
        public: false
      })
    }

    try {
      const response = await fetch(endpoint, params)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setPlaylistName({ name: name, id: playlistName.id })
    } catch (error) {
      console.log(error.message)
    }
  }, [accessToken, playlistName.id])

  // adding to playlist.
  const addToPlaylist = (track) => {
    // check if track is already in playlist
    if (playlistTracks.find((item) => item.id === track.id)) {
      return;
    }
    setPlaylistTracks((playlist) => ([...playlist, track]));
    setSaved(false)
  };


  // saving uri's for reference.
  const saveUri = (track) => {
    if(uriList.includes(track.uri)) return;
    setUriList((playlistUris)=>([...playlistUris, `${track.uri}`]));
  }

  // deleting uri's when a song is removed from the saved playlist.
  const deleteUri = (track) => {
    setUriList(uriList.filter((uri) => uri !== track.uri));
  }

  // removing from playlist.
  const removeFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter((item) => item.id !== track.id));
  };


  const savePlaylist = async () => {
    if(!user.id && !playlistName.id) return
    
    // Filter out URIs that have already been saved
    // const newUris = uriList.filter(uri => !playlistTracks.some(track => track.uri === uri && uriList.includes(uri)))
    
    // if(newUris.length === 0) return
    
    const endpoint = `https://api.spotify.com/v1/playlists/${playlistName.id}/tracks`
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: uriList,
        position: 0
      })
    }

    try{
      const response = await fetch(endpoint, params)
      if(!response.ok) throw new Error(`Error: ${response.status}`)
      setSaved(true)
      
      // reset the uriList when we save tracks.
      setUriList([])
      
    } catch(error){
      console.log(error.message)
    }
  }

  // end playlist handlers.


  return (
    <div>
      <Header user={user} isLogin={loginStatus} handleLogout={handleLogout} />
      <div className={styles.app}>
        <div className={styles.asideContainer}>
          <div className={styles.aside}>
            {/* custon track list here to save to spotify. */}
            <PlayList name={playlistName.name} id={playlistName.id} savePlaylistName={savePlaylistName} updatePlaylistName={updatePlaylistName} tracks={playlistTracks} removeFromPlaylist={removeFromPlaylist} deleteUri={deleteUri} savePlaylist={savePlaylist} saved={saved}/>
          </div>
          {/* TODO: future add, media player below the playlist */}
        </div>

        <div className={styles.main}>
          <SearchBar searchHandler={handleSearch} accessToken={accessToken}/>
          <h1 className={styles.heading}>Good music, good life</h1>

          {/* results container */}
          {tracks.length !== 0 ? (
            <SearchResults tracks={tracks} addToPlaylist={addToPlaylist} saveUri={saveUri}/>
            ) : (
            <p className={styles.emptyMessage}>A great day starts with some good tunes</p>
            )}
        </div>
      </div>
    </div>
  )
}

export default App

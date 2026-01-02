import React, { useState } from 'react'

// styling
import styles from '@css/PlayList.module.css'


// assets
import saveIcon from '@assets/Primary_Logo_Black_CMYK.svg'

const PlayList = ({name, id, savePlaylistName, updatePlaylistName, tracks, removeFromPlaylist, deleteUri, savePlaylist, saved}) => {

  const [playlistName, setPlaylistName] = useState(name)
  const [edit, setEdit] = useState(false)
  
  
  const handleAddPlaylistName = (e) => {
    e.preventDefault();
    savePlaylistName(playlistName);
    setEdit(false);
  }

  const handleUpdatePlaylistName = (e) => {
    e.preventDefault()
    updatePlaylistName(playlistName, id)
    setEdit(false);
  }


  // letting user update playlist name by clicking on it.
  const handleClickUpdate = () => {
    setEdit(true)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setPlaylistName(e.target.value);
  }

  const handleRemove = (track) => {
    removeFromPlaylist(track);
    deleteUri(track);
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        {!name || name === '' ? (
          <form onSubmit={handleAddPlaylistName}>
            <input name='playlist name' value={playlistName} onChange={handleChange} placeholder='Add Playlist Name...' className={styles.input}/>
          </form>
        ) : edit ? (
          <form onSubmit={handleUpdatePlaylistName}>
            <input name='playlist name' value={playlistName} onChange={handleChange} placeholder={playlistName} className={styles.input}/>
          </form>
        ) : (
          <h3 onClick={handleClickUpdate}>{name}</h3>
        )}
        <p>{tracks.length}</p>
      </div>

      {/* playlist container */}
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', minHeight: '150px', maxHeight: '300px', overflowY: 'auto', alignContent: 'flex-end'}}>
        {tracks.length > 0 ? (
          <ul className={styles.list}>
            {tracks.map((track) => (
              <li key={track.id} className={styles.songItemContainer}>
                <div className={styles.songItem}>
                  <span className={styles.songName}>{track.name}</span>
                  <span className={styles.artist}>-{Array.isArray(track.artists) ? track.artists.map(artist => artist.name).join(', ') : track.artists[0].name}</span>
                </div>
                <div className={styles.removeButton} onClick={() => handleRemove(track)}>
                  <p>remove</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>Your playlist is currently empty</p>
        )}
      </div>

      {tracks.length > 0 && saved == false ? (
        <button className={styles.saveButton} onClick={savePlaylist}>
          <img src={saveIcon} alt="Save Icon" className={styles.saveIcon} />
          Save Playlist
        </button>
      ) : saved ? (
        <p className={styles.saved}>Saved</p>
      )
      : null
      }
    </div>
  )
}

export default PlayList

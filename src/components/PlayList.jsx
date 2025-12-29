import React, { useState } from 'react'

// styling
import styles from '@css/PlayList.module.css'


// assets
import saveIcon from '@assets/Primary_Logo_Black_CMYK.svg'

const PlayList = ({name, updatePlaylistName, tracks, removeFromPlaylist, deleteUri}) => {

  const [playlistName, setPlaylistName] = useState(name)
  

  const handleAddPlaylistName = (e) => {
    e.preventDefault();
    updatePlaylistName(playlistName);
  }

  // letting user update playlist name by clicking on it.
  const handleClickUpdate = () => {
    updatePlaylistName(null);
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

        <div>
          {name == null || name == '' ? (
            <form onSubmit={handleAddPlaylistName}>
              <input name='playlist name' value={playlistName} onChange={handleChange} placeholder='Add Playlist Name...' className={styles.input}/>
            </form>
            ) : <h3 onClick={handleClickUpdate}>{name}</h3>}
        </div>

        <p>{tracks.length}</p>
      </div>

      {/* playlist container */}
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', minHeight: '150px', maxHeight: '300px', overflowY: 'auto', alignContent: 'flex-end'}}>
        {/* Playlist items would go here */}
        {tracks.length > 0 ? (
          <ul className={styles.list}>
            {tracks.map((track) => (
              <li key={track.id} className={styles.songItemContainer}>
                <div className={styles.songItem}>
                  <span className={styles.songName}>{track.songName}</span>
                  <span className={styles.artist}>-{track.artist}</span>
                </div>
                <div 
                  className={styles.removeButton}
                  onClick={() => handleRemove(track)}>
                  <p>remove</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>Your playlist is currently empty</p>
        )}
      </div>

      {/* save button */}
      {/* conditionally render create and save buttons */}
      
      {tracks.length > 0 ? (
        <div>
          <button 
            className={styles.saveButton}>
            <img 
              src={saveIcon} 
              alt="Save Icon" 
              className={styles.saveIcon} 
            />
              Save Playlist
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default PlayList

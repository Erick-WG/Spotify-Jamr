import React, { useState } from 'react'

// styling
import styles from '@css/PlayList.module.css'


// assets
import saveIcon from '@assets/Primary_Logo_Black_CMYK.svg'

const PlayList = ({tracks, removeFromPlaylist}) => {

  const [playlistName, setPlaylistName] = useState(null)
  

  const handleAddPlaylistName = (e) => {
    e.preventDefault()
    const { value } = e.target;
    setPlaylistName(value);
  }

  const handleRemove = (track) => {
    removeFromPlaylist(track);
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>

        <h3>
          {playlistName == null ? (
            <form onSubmit={handleAddPlaylistName}>
              <input name='playlist name' value={playlistName}/>
            </form>
            ) : playlistName}
        </h3>

        <p>{tracks.length} tracks</p>
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
          <p>Your playlist is currently empty</p>
        )}
      </div>

      {/* save button */}
      {/* consitionally render create and save buttons */}
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
    </div>
  )
}

export default PlayList

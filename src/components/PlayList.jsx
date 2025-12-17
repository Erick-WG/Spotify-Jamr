import React from 'react'

// styling
import styles from '@css/PlayList.module.css'


// assets
import saveIcon from '@assets/Primary_Logo_Black_CMYK.svg'


const PlayList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>My Plalist</h3>
        <p>STS</p>
      </div>

      {/* playlist container */}
      <div>
        <p>Your playlist is currently empty.</p>
        {/* Playlist items would go here */}
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

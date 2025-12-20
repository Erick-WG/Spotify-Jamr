import React, { useState } from 'react'


// assets
import add from '@assets/add_black.svg'
import added from '@assets/added.svg'

// styling
import styles from '@css/TrackList.module.css'


// add button functionality will be added later, remember to pass props for added state

const Track = ({track, index, addToPlaylist}) => {

  const [addedTrack, setAddedTrack] = useState(false);
  
    const toggleAddedState = () => {
      console.log('toggling added state');
      setAddedTrack(true);
    }

  const handleClick = () => {
    toggleAddedState();
    addToPlaylist(track);
  }

  return (
    <li className={styles.albumContainer} key={track.id}>
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
        {/* song data */}
        <p>{index+1}</p>
        <p>|</p>
        <div>
          <p>
            <strong className={styles.song}>{track.songName}</strong> 
          </p>
          <p className={styles.songTag}>By {track.artist} from the album {track.album}</p>
        </div>
      </div>

      {/* buttons */}
      <div 
        onClick={handleClick}
        className={styles.addButtonContainer}>
          {addedTrack ? <img className={styles.addButton} src={added} alt="Added" /> : <img className={styles.addButton} src={add} alt="Add" />}
      </div>
    </li>
  )
}

export default Track

import React, { useState, useEffect } from 'react'


// assets
import add from '@assets/add_black.svg'
import added from '@assets/added.svg'

// styling
import styles from '@css/TrackList.module.css'


// add button functionality will be added later, remember to pass props for added state

const Track = ({track, addToPlaylist, saveUri}) => {

  const [addedTrack, setAddedTrack] = useState(false);


    // toggle added state with a timer to reset after some time.
    useEffect(() => {
      let timer;
      if (addedTrack) {
        timer = setTimeout(() => {
          setAddedTrack(false);
        }, 1000); // Reset after 0.5 seconds
      }
      return () => clearTimeout(timer);
    }, [addedTrack]);

  
    const toggleAddedState = () => {
      setAddedTrack(true);
    }

  const handleClick = () => {
    toggleAddedState();
    addToPlaylist(track);
    saveUri(track);
  }

  return (
    <li className={styles.albumContainer} key={track.id}>
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
        <p>{`${track.number + 1} `}</p>
        <p>|</p>
        <div>
          <p>
            <strong className={styles.song}>{track.name}</strong> 
          </p>
          <p className={styles.songTag}>By {Array.isArray(track.artists) ? track.artists.map(artist => artist.name).join(', ') : track.artists[0].name} from the album {track.album["name"]}</p>
        </div>
      </div>
      <div 
        onClick={handleClick}
        className={styles.addButtonContainer}>
          {addedTrack ? <img className={styles.addButton} src={added} alt="Added" /> : <img className={styles.addButton} src={add} alt="Add" />}
      </div>
    </li>
  )
}

export default Track

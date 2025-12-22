import React from 'react'


// styling
import styles from '@css/TrackList.module.css'

// components
import Track from './Track'


const TrackList = ({tracks, addToPlaylist, saveUri}) => {

  return (
    <div style={{width: '70%'}}>
        <h3 className={styles.heading}>Track List</h3>
        <ul className={styles.list}>
          {/* tracks array traversal */}
            {tracks.map((track, index) => (
                <Track track={track} index={index} addToPlaylist={addToPlaylist} saveUri={saveUri} />
            ))}
        </ul>
    </div>
  )
}

export default TrackList

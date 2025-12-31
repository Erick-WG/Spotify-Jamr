import React from 'react'


// styling
import styles from '@css/TrackList.module.css'

// components
import Track from '@components/Track'


const TrackList = ({searchTerm, tracks, addToPlaylist, saveUri}) => {

  return (
    <div style={{width: '70%'}}>
      {searchTerm ? (<p className={styles.heading}>Showing results for {searchTerm}...</p>) : ''}
      
      {tracks && <ul className={styles.list}>
        {/* tracks array traversal */}
          {tracks.map((track, index) => (
              <Track track={track} key={index} addToPlaylist={addToPlaylist} saveUri={saveUri} />
          ))}
      </ul>}
    </div>
  )
}

export default TrackList

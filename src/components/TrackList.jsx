import React from 'react'


// styling
import styles from '@css/TrackList.module.css'

// assets
import add from '@assets/add_black.svg'
import added from '@assets/added.svg'


const TrackList = ({tracks}) => {
  return (
    <div style={{width: '70%'}}>
        <h3 className={styles.heading}>Track List</h3>
        <ul className={styles.list}>
          {/* tracks array traversal */}
            {tracks.map((track, index) => (
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
                  <div className={styles.addButtonContainer}>
                    <img className={styles.addButton} src={add} alt="Add" />
                    <img className={styles.addButton} src={added} alt="Add" />
                  </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TrackList

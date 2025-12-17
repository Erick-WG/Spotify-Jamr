import React from 'react'


// styling
import styles from '@css/TrackList.module.css'

// assets
import add from '@assets/add_black.svg'
import added from '@assets/added.svg'


const tracks = [
  {
    id: 1,
    songName: 'Track One',
    artist: 'Artist A',
    album: 'Album Alpha'
  },
  {
    id: 2,
    songName: 'Track Two',
    artist: 'Artist B',
    album: 'Album Beta'
  },
  {
    id: 3,
    songName: 'Track Three',
    artist: 'Artist C',
    album: 'Album Gamma'
  },
  {
    id: 4,
    songName: 'Midnight Echo',
    artist: 'Luna Sky',
    album: 'Starlight Dreams'
  },
  {
    id: 5,
    songName: 'Electric Vibes',
    artist: 'Neon Pulse',
    album: 'Synthetic Waves'
  },
  {
    id: 6,
    songName: 'Ocean Breeze',
    artist: 'Coastal Tides',
    album: 'Sea Songs'
  },
  {
    id: 7,
    songName: 'Urban Jazz',
    artist: 'City Sounds',
    album: 'Metropolitan Groove'
  },
  {
    id: 8,
    songName: 'Forest Whispers',
    artist: 'Nature Calls',
    album: 'Woodland Tales'
  },
  {
    id: 9,
    songName: 'Neon Lights',
    artist: 'Synth Wave',
    album: 'Future Retro'
  },
  {
    id: 10,
    songName: 'Golden Hour',
    artist: 'Sunset Riders',
    album: 'Desert Dreams'
  },
  {
    id: 11,
    songName: 'Cosmic Journey',
    artist: 'Space Explorers',
    album: 'Beyond Horizons'
  },
  {
    id: 12,
    songName: 'Rhythm of Life',
    artist: 'Heartbeat Collective',
    album: 'Living Moments'
  },
  {
    id: 13,
    songName: 'Velvet Nights',
    artist: 'Smooth Operators',
    album: 'Late Night Sessions'
  },
  {
    id: 14,
    songName: 'Dancing Stars',
    artist: 'Celestial Beats',
    album: 'Galactic Grooves'
  },
  {
    id: 15,
    songName: 'Autumn Leaves',
    artist: 'Season Keepers',
    album: 'Through the Seasons'
  }
]


const TrackList = () => {
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

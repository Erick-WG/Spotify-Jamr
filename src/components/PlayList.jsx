import React from 'react'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
}

const headingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#333',
  borderBottom: '2px solid #1db954',
  padding: '10px 15px',
  paddingBottom: '10px',
  width: '90%',
  textAlign: 'center'
}

const PlayList = () => {
  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <h3>My Plalist</h3>
        <p>STS</p>
      </div>
      {/* Playlist items would go here */}
    </div>
  )
}

export default PlayList

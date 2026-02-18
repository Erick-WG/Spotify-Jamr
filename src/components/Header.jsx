import React from 'react'
import styles from '@css/App.module.css'
import Connect from '@/features/access/Connect'



const Header = ({ user, isLogin, handleLogout}) => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {user ? (<p className={styles.user}>Hi {user.name}</p>) : (<p className={styles.user}>Hi There</p>)}
        <h1>Jam Tunr</h1>
        {isLogin ? (
          <p className={styles.logout} onClick={handleLogout}>logout</p>
        ) : (
          <Connect />
        )}
      </div>
    </header>
  )
}

export default Header

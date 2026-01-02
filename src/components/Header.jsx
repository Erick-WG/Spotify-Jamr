import React from 'react'
import styles from '@css/App.module.css'



const Header = ({ user, isLogin, handleLogin, handleLogout}) => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {user ? (<p className={styles.user}>Hi {user.name}</p>) : (<p className={styles.user}>Hi There</p>)}
        <h1>Jam Tunr</h1>
        {isLogin ? (
          <p className={styles.logout} onClick={handleLogout}>logout</p>
        ) : (
          <p className={styles.login} onClick={handleLogin}>login</p>
        )}
      </div>
    </header>
  )
}

export default Header

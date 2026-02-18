import React from 'react'
import { useDispatch } from 'react-redux';
import { saveAuthCode } from './accessSlice';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCodeVerifier } from '@features/access/accessSlice';
import { fetchAccessToken } from './accessSlice';



const Login = () => {
  const code_verifyer = useSelector(selectCodeVerifier)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // check for auth code in url params, if it exists save it to store and local storage, then clear the url params.
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');

  if (code) {
    // save auth code to store.
    dispatch(saveAuthCode(code))
    dispatch(fetchAccessToken({code_verifyer, code}))


    // window.localStorage.setItem('auth_code', code);
    window.history.replaceState({}, '', window.location.pathname);
  }

  return (
    <div onClick={() => navigate('/')}>
      See code
      {code ? <p>{code}</p> : <p>No code found</p>}
    </div>
  )
}

export default Login

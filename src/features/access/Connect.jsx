import React from 'react'

// slice state update for the code verifyer and the auth code genarated here.
import { saveCodeVerifyer, saveCodeChallenge, saveAuthCode, selectCodeChallenge, selectCodeVerifier, fetchAccessToken } from './accessSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const Connect = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // getting the data from store.
  // const accessToken = useSelector(selectAccessToken)
  const codeVerifier = useSelector(selectCodeVerifier)
  const codeChallenge = useSelector(selectCodeChallenge)
  // const authenticationCode = useSelector(selectAuthenticationCode)

  
  // generating a random string for code_verifier
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  // requesting a code verifier on component mount, if we don't have one already. this is needed for the authorization request to spotify.
  useEffect(() => {
    if (codeVerifier === null) {
      dispatch(saveCodeVerifyer(generateRandomString(64)))
      console.log(codeVerifier)
    }

    // getting the authentication code from the url, this is needed for the access token request to spotify. this is done in the callback component after the user is redirected back to our app from spotify's authorization page.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      dispatch(saveAuthCode(code))
      window.history.replaceState({}, document.title, "/") // remove the code from the url
      navigate('/profile')
    }

    if(codeVerifier && code){
      dispatch(fetchAccessToken({codeVerifier, code}))
    }


  }, [navigate, dispatch, codeVerifier]);


  // generate a code challenge if we have a code verifier.
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  // function to return a code challenge from a code verifier. to be used in the authorization request to spotify.
  const generateCodeChallenge = async (codeVerifier) => {
    const hashed = await sha256(codeVerifier)
    return base64encode(hashed)
  }  

  // generate a code challenge if we have a code verifier and we don't have a code challenge yet. this is needed for the authorization request to spotify.
  if (codeVerifier && !codeChallenge) {
    generateCodeChallenge(codeVerifier).then(challenge => dispatch(saveCodeChallenge(challenge)))
  }


  // requesting an authentication token from spotify's user account service. this is needed to get an access token and refresh token from spotify.
  const handleGetAuthenticationCode = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    
    const scope = 'user-read-private user-read-email';
    const authUrl = new URL(import.meta.env.VITE_AUTH_ENDPOINT)
    
    const params =  {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }
    
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();    
  }

  return (
    
      <button onClick={handleGetAuthenticationCode}>
        <p>Connect to Spotify</p>
      </button>
  )
}

export default Connect

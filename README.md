# Spotify app clone.

This project is a spotify clone, allowing a user to login to their spotify account and add playlists and tracks through a simplified interface built with [React](https://react.dev/learn), [Vite](https://vite.dev/) and the [Spotify web API](https://developer.spotify.com/documentation/web-api).


## API Reference

#### Before we look up some tunes

- Learn how to authenticate from the  [Authentication docs](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow) offered by spotify. 
- Understand the [Access token](https://developer.spotify.com/documentation/web-api/concepts/access-token) from the spotify docs.
- How to [Search](https://developer.spotify.com/documentation/web-api/reference/search) on spotify.

## Documentation
#### Looking up some tunes.

1) You need to first get an [access token](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow#request-an-access-token) following the [pcke auth flow](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow) to gain access to a user account, our app attempts to gain an authentication code we can exchange for an access token on first load, redirecting the user to sign in to their spotify account so that we can have the auth code we can exchange for an access token later. ![A screenshot of the project](docs/images/spotify%20access.png)


2) When the user logs in the app starts the authorization flow to exchange the authentication code we got for an access token we can use to perforn actions on behalf of the user.
![Login](docs/images/spotify%20login.png)
Logged in as `Eric-WG`
![Logged in](docs/images/spotify%20logged%20in.png)

   once we have an access token, we can perform a search based on a user's query (`q: searchTerm`).

```js
const endpoint = `https://api.spotify.com/v1/search?`
const urlParams = new URLSearchParams({
    q: term, // query value assigned to the "q" key
    type: 'track | album | artist',
    ...
})

// for our app to fetch we need to configure the fetch deps object to contain our access token.
const params = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${access_token}` // aquired access token.
    }
}

const url = endpoint.concat(urlParams.toString())
async function getData(){
    ...
    const response = await fetch(url, params) 
    ...
}
```

get the items array from the response json object, this is where all our requested items live.

```js
...
// tracks location.
const data = response.json()
const tracks = data.tracks.items // array of tracks
...
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required**. User access_token  |
|  `type`  |  `string`  |  **Required**. type of data being fetched  |


3) Add a playlist name and start adding tracks.
![search](docs/images/spotify%20add%20playlistname%20and%20track.png)
...add more tracks to your liking.
![add more tracks](docs/images/spotify%20add%20tracks.png)
4) Save playlist to user account.
![save playlist and it's tracks](docs/images/spotify%20save%20playlist.png)


5) Verify the app is working as expected.
   ![spotify library](docs/images/spotify%20playlist%20library.png)
   our 3 songs have been added to the playlist, great :)
   ![playlist preview](docs/images/spotify%20playlist.png)


**Important Notice:** The app is fine at this point and does what I intended it to, although it does need some exception handling in the authorization process, I didn't intent to implement it now since it was a bit out of scope at the moment, I'll be adding more features and functionality as the scope broadens with time.
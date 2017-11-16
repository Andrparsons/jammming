import Config from './Config';

const ClientId = Config.ClientId;
const redirectURI = Config.redirectURI;

let accessToken;

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } 
    
    //pulls the data from the url provided by spotify
    const expiresInRegx = window.location.href.match(/expires_in=([^&]*)/);
    const accessTokenRegX = window.location.href.match(/access_token=([^&]*)/);
    
    if (expiresInRegx && accessTokenRegX) {
      //clear so it doesn't use expired tokens
      window.setTimeout(()=> accessToken = '', expiresInRegx[1] * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessTokenRegX[1];
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${ClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs) {
      const token = this.getAccessToken();
      const headers =  { Authorization: `Bearer ${token}` };
      let userID;
      let playlistID;

      return fetch(
        'https://api.spotify.com/v1/me',
        {headers: headers}
      )
      .then(response => response.json())
      .then(jsonResponse => {
        userID = jsonResponse.id;
        fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }
        )
        .then(response => response.json())
        .then(jsonResponse => {
          playlistID = jsonResponse.id;
          fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURIs})
            }
          )
        })
      })
    } else {
      return;
    }
  },

  search(term) {
     accessToken = this.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {headers: { Authorization: `Bearer ${accessToken}` }}
    )
    .then(response => response.json())
    .then(jsonResponse => {
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri:  track.uri
        }))
      } else {
        return [];
      }
    });
  }
};

export default Spotify;

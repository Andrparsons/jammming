React Project

Connects to Spotify Search API to find tracks and populates the results. Can add or delete songs to a playlist.

Created playlists can be saved to the users account.

Project needs a spotify account and client ID to work.
Create a config file in the util directory.

```javascript
const Config = {
  ClientId: 'YOUR_CLIENT_ID',
  redirectURI: 'http://localhost:3000/'
}
```
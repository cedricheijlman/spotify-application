import React, { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";

function PlaylistPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Playlist
  const [playlist, setPlaylist] = useState();

  return (
    <div>
      <h1>Playlist</h1>
    </div>
  );
}

export default PlaylistPage;

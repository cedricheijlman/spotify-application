import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";

function PlaylistPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Playlist
  const [playlist, setPlaylist] = useState(null);

  // get id playlist from url
  const playlistId = window.location.pathname.slice(10);

  //Get Playlist
  useEffect(() => {
    if (!playlist) {
      spotifyApi.getPlaylist(playlistId, {}, (err, result) => {
        setPlaylist(result);
        console.log(result);
      });
    }
  }, [playlistId]);

  return (
    <div>
      <h1>Playlist</h1>
    </div>
  );
}

export default PlaylistPage;

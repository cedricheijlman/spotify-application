import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./playlistpage.css";

function PlaylistPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Playlist
  const [playlist, setPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState(null);
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

  useEffect(() => {
    if (playlist) {
      spotifyApi.getPlaylistTracks(playlistId, {}, (err, result) => {
        setPlaylistTracks(result);
        console.log("Playlist tracks", result);
      });
    }
  }, [playlist]);

  return (
    <div id="playlistPage">
      {playlist !== null && (
        <>
          <div className="playlistPage__info">
            <img width={250} src={playlist.images[0].url} />
            <div className="playlistPage__infoText">
              <p className="playlistType">{playlist.type}</p>
              <h2>{playlist.name}</h2>
              <p>{playlist.description}</p>
              <div className="playlistOwnerAndTracks">
                <p>
                  {playlist.owner.display_name} • {playlist.tracks.total} Tracks
                </p>
              </div>
            </div>
          </div>
          <div>
            {playlistTracks &&
              playlistTracks.items.map((item) => {
                return (
                  <div>
                    <h5>{item.track.name}</h5>
                    <p>{item.track.artists[0].name}</p>
                    <hr />
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default PlaylistPage;

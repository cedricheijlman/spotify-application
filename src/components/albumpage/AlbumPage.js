import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./albumpage.css";

function AlbumPage() {
  // get album ID from url
  const albumId = window.location.pathname.slice(7);

  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Albums
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState(null);

  // setState currentTrack
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

  // Get Playlist Info
  useEffect(() => {
    if (!album) {
      spotifyApi.getAlbum(albumId, {}, (err, result) => {
        setAlbum(result);
        console.log("result", result);
      });
    }
  }, [albumId]);

  return (
    <div id="albumPage">
      {album !== null && (
        <>
          <div className="albumPage__info">
            <img height={230} src={album.images[0].url} />
            <div className="albumPage__infoText">
              <p className="albumType">{album.album_type}</p>
              <h2>{album.name}</h2>
              <div className="albumOwnerAndTracks">
                <p>
                  {album.artists[0].name} • {album.tracks.total} Tracks
                </p>
              </div>
            </div>
          </div>
          <div className="albumPage__tracksList"></div>
        </>
      )}
    </div>
  );
}

export default AlbumPage;

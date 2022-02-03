import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./artistpage.css";

function ArtistPage() {
  // get Artist ID from url
  const artistId = window.location.pathname.slice(8);

  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Artist
  const [artist, setArtist] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);

  useEffect(() => {
    if (!artist) {
      spotifyApi.getArtist(artistId, {}, (err, result) => {
        setArtist(result);
      });
    }

    if (!artistTopTracks) {
      spotifyApi.getArtistTopTracks(artistId, "US", {}, (err, result) => {
        setArtistTopTracks(result);
      });
    }

    if (!artistAlbums) {
      spotifyApi.getArtistAlbums(artistId, {}, (err, result) => {
        setArtistAlbums(result);
      });
    }
  }, [artistId]);

  return (
    <div id="artistPage">
      {artist !== null && (
        <>
          <div className="artist__info">
            <div>
              <img src={artist.images[0] && artist.images[0].url} />
            </div>
            <div className="artist__infoText">
              <p>{artist.type && artist.type}</p>
              <h2>{artist.name && artist.name}</h2>
              <p>{artist.followers && artist.followers.total} Followers</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArtistPage;

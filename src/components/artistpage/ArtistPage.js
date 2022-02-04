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
        console.log("artist Info:", result);
      });
    }

    if (!artistAlbums) {
      spotifyApi.getArtistAlbums(artistId, {}, (err, result) => {
        setArtistAlbums(result);
      });
    }
  }, [artistId]);

  // Track length
  const getSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div id="artistPage">
      {artist !== null && artistTopTracks !== null && (
        <>
          <div className="artist__info">
            <div>
              <img src={artist.images[0] && artist.images[0].url} />
            </div>
            <div className="artist__infoText">
              <p>{artist.type && artist.type}</p>
              <h2>{artist.name && artist.name}</h2>
              <p>
                {artist.followers &&
                  artist.followers.total
                    .toLocaleString()
                    .replace(/\./g, ",")}{" "}
                Followers
              </p>
            </div>
          </div>
          <div className="artist__optionList">
            <p>Top Tracks</p>
            <p>Albums</p>
            <p>Related Artists</p>
          </div>
          <div id="topTracks">
            <h2>Top Tracks</h2>
            <div className="TopTracks__row">
              {artistTopTracks.tracks.map((track, index) => {
                return (
                  <div className="topTracks__item">
                    <div className="topTracks__itemLeft">
                      <p>{index + 1}</p>
                      <img src={track.album.images[0].url} />
                      <h4>{track.name}</h4>
                    </div>
                    <p>{getSeconds(track.duration_ms)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArtistPage;

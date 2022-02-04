import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./artistpage.css";

function ArtistPage() {
  const [currentOption, setCurrentOption] = useState("topTracks");

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
  const [artistSinglesAndEps, setArtistSingleAndEps] = useState(null);
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
      spotifyApi.getArtistAlbums(
        artistId,
        { include_groups: "album", market: "US" },
        (err, result) => {
          setArtistAlbums(result);
          console.log("artist Info:", result);
        }
      );
    }

    if (!artistSinglesAndEps) {
      spotifyApi.getArtistAlbums(
        artistId,
        { include_groups: "single" },
        (err, result) => {
          setArtistSingleAndEps(result);
        }
      );
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
            <p onClick={() => setCurrentOption("topTracks")}>Top Tracks</p>
            <p onClick={() => setCurrentOption("albums")}>Albums</p>
            <p onClick={() => setCurrentOption("singlesAndEps")}>
              Singles And EP's
            </p>
            <p onClick={() => setCurrentOption("relatedArtists")}>
              Related Artists
            </p>
          </div>

          {currentOption == "topTracks" && (
            <div id="containerArtist">
              <h2>Top Tracks</h2>
              <div className="artist__optionRow">
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
          )}

          {currentOption == "albums" && (
            <div id="containerArtist">
              <h2>Albums</h2>
              <div className="artist__optionRow">
                {artistAlbums.items
                  .filter(
                    (track, index, self) =>
                      track.name !==
                      self[index !== self.length - 1 ? index + 1 : index - 1]
                        .name
                  )
                  .map((album) => {
                    return (
                      <div className="artistAlbum__item">
                        <img src={album.images[0].url} />
                        <h5>{album.name}</h5>
                        <p>{album.release_date.slice(0, 4)}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArtistPage;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";
import ArtistCard from "../main/ArtistCard";
import "./artistpage.css";

function ArtistPage() {
  const [currentOption, setCurrentOption] = useState("topTracks");
  const [artistChange, setArtistChange] = useState(0);
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
  const [relatedArtists, setRelatedArtists] = useState(null);
  useEffect(() => {
    spotifyApi.getArtist(artistId, {}, (err, result) => {
      setArtist(result);
    });

    spotifyApi.getArtistTopTracks(artistId, "US", {}, (err, result) => {
      setArtistTopTracks(result);
      console.log(result);
    });

    spotifyApi.getArtistAlbums(
      artistId,
      { include_groups: "album", market: "US" },
      (err, result) => {
        setArtistAlbums(result);
      }
    );

    spotifyApi.getArtistAlbums(
      artistId,
      { include_groups: "single", market: "US", limit: 50 },
      (err, result) => {
        setArtistSingleAndEps(result);
      }
    );

    spotifyApi.getArtistRelatedArtists(artistId, {}, (err, result) => {
      setRelatedArtists(result);
      console.log("artist Info:", result);
    });
  }, [artistId, artistChange]);

  // Track length
  const getSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  // setState currentTrack
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

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
            <p
              className={currentOption == "topTracks" ? "selected" : ""}
              onClick={() => setCurrentOption("topTracks")}
            >
              Top Tracks
            </p>
            <p
              className={currentOption == "albums" ? "selected" : ""}
              onClick={() => setCurrentOption("albums")}
            >
              Albums
            </p>
            <p
              className={currentOption == "singlesAndEps" ? "selected" : ""}
              onClick={() => setCurrentOption("singlesAndEps")}
            >
              Singles And EP's
            </p>
            <p
              className={currentOption == "relatedArtists" ? "selected" : ""}
              onClick={() => setCurrentOption("relatedArtists")}
            >
              Related Artists
            </p>
          </div>

          {currentOption == "topTracks" && (
            <div id="containerArtist">
              <h2>Top Tracks</h2>
              <div className="artist__optionRow">
                {artistTopTracks.tracks.map((track, index) => {
                  return (
                    <div
                      key={track.id}
                      onClick={(e) => {
                        if (e.target.localName !== "img") {
                          setCurrentTrack(track.uri);
                        }
                      }}
                      className="topTracks__item"
                    >
                      <div className="topTracks__itemLeft">
                        <p>{index + 1}</p>
                        <Link to={`/album/${track.album.id}`}>
                          <img
                            title={track.album.name}
                            src={track.album.images[0].url}
                          />
                        </Link>
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
                    (album, index, self) =>
                      self.length == 1 ||
                      album.name !==
                        self[index !== self.length - 1 ? index + 1 : index - 1]
                          .name ||
                      (self.length == 2 &&
                        index !== 1 &&
                        album.name == self[1].name)
                  )
                  .map((album) => {
                    return (
                      <Link key={album.id} to={`/album/${album.id}`}>
                        <AlbumCard
                          key={album.id}
                          img={album.images[0].url}
                          name={album.name}
                        />
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "singlesAndEps" && (
            <div id="containerArtist">
              <h2>Singles And EP's</h2>
              <div className="artist__optionRow">
                {artistSinglesAndEps.items
                  .filter(
                    (track, index, self) =>
                      track.name !==
                      self[index !== self.length - 1 ? index + 1 : index - 1]
                        .name
                  )
                  .map((album) => {
                    return (
                      <Link key={album.id} to={`/album/${album.id}`}>
                        <AlbumCard
                          key={album.id}
                          img={album.images[0] ? album.images[0].url : ""}
                          name={album.name}
                          releaseDate={album.release_date.slice(0, 4)}
                        />
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "relatedArtists" && (
            <div id="containerArtist">
              <h2>Others also like</h2>
              <div className="artist__optionRow">
                {relatedArtists.artists.map((artist) => {
                  return (
                    <Link
                      onClick={() => {
                        setCurrentOption("topTracks");
                        setArtistChange(artistChange + 1);
                      }}
                      key={artist.id}
                      to={`/artist/${artist.id}`}
                    >
                      <ArtistCard
                        img={
                          artist.images[0] !== null ? artist.images[0].url : ""
                        }
                        artistName={artist.name}
                      />
                    </Link>
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

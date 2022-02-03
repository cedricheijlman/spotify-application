import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./playlistpage.css";

function PlaylistPage() {
  // get id playlist from url
  const playlistId = window.location.pathname.slice(10);

  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // setState Playlist
  const [playlist, setPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState(null);

  // setState currentTrack
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

  // Get Playlist Info
  useEffect(() => {
    if (!playlist) {
      spotifyApi.getPlaylist(playlistId, {}, (err, result) => {
        setPlaylist(result);
        console.log(result);
      });
    }
  }, [playlistId]);

  // Get Playlists tracks
  useEffect(() => {
    if (playlist) {
      spotifyApi.getPlaylistTracks(playlistId, {}, (err, result) => {
        setPlaylistTracks(result);
        console.log("Playlist tracks", result);
      });
    }
  }, [playlist]);

  // Track length
  const getSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div id="playlistPage">
      {playlist !== null && (
        <>
          <div className="playlistPage__info">
            <img height={230} src={playlist.images[0].url} />
            <div className="playlistPage__infoText">
              <p className="playlistType">{playlist.type}</p>
              <h2>{playlist.name}</h2>
              <p className="playlistDescription">{playlist.description}</p>
              <div className="playlistOwnerAndTracks">
                <p>
                  {playlist.owner.display_name} • {playlist.tracks.total} Tracks
                </p>
              </div>
            </div>
          </div>
          <div className="playlistPage__tracksList">
            {playlistTracks &&
              playlistTracks.items.map((item, index) => {
                return (
                  <div
                    onClick={(e) => {
                      if (
                        e.target.localName !== "h6" &&
                        e.target.localName !== "img"
                      ) {
                        setCurrentTrack(item.track.uri);
                        console.log(e);
                      }
                    }}
                    className="playlistPage__trackItem"
                  >
                    <div className="playlistPage__trackItemLeft">
                      <p className="trackNumber">{index + 1}</p>
                      <Link
                        title={item.track.album.name}
                        to={`/album/${item.track.album.id}`}
                      >
                        <img
                          height={60}
                          src={
                            item.track.album.images[0]
                              ? item.track.album.images[0].url
                              : ""
                          }
                        />
                      </Link>
                      <div className="trackNameAndArtist">
                        <h5>{item.track.name}</h5>
                        {item.track.artists.map((artist, index) => (
                          <Link to={`/artist/${artist.id}`} key={index}>
                            <h6>{artist.name}</h6>
                            <span style={{ fontWeight: 200 }}>
                              {item.track.artists.length - 1 !== index
                                ? ", "
                                : ""}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="time">
                        {getSeconds(item.track.duration_ms)}
                      </p>
                    </div>
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

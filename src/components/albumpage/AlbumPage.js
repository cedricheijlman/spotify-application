import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  // Track length
  const getSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

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
                  <Link to={`/artist/${album.artists[0].id}`}>
                    {album.artists[0].name}
                  </Link>{" "}
                  • {album.tracks.total}{" "}
                  {album.tracks.total == 1 ? "Track" : "Tracks"}
                </p>
              </div>
            </div>
          </div>
          <div className="albumPage__tracksList">
            {album.tracks &&
              album.tracks.items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item !== null && (
                      <div
                        onClick={(e) => {
                          if (
                            e.target.localName !== "h6" &&
                            e.target.localName !== "img"
                          ) {
                            setCurrentTrack(item.uri);
                            console.log(e);
                          }
                        }}
                        className="albumPage__trackItem"
                      >
                        <div className="albumPage__trackItemLeft">
                          <p className="trackNumber">{index + 1}</p>

                          <div className="trackNameAndArtist">
                            <h5>{item.name}</h5>
                            <div>
                              {item.artists.map((artist, index) => (
                                <Link to={`/artist/${artist.id}`} key={index}>
                                  <h6>{artist.name}</h6>
                                  <span style={{ fontWeight: 200 }}>
                                    {item.artists.length - 1 !== index
                                      ? ", "
                                      : ""}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="time">{getSeconds(item.duration_ms)}</p>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default AlbumPage;

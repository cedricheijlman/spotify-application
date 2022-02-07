import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";
import PlaylistCard from "../main/AlbumCard";
import "./discover.css";
function Discover() {
  const accessKeyApi = sessionStorage.getItem("accessToken");
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);
  const [currentOption, setCurrentOption] = useState("pop");
  const [limit, setLimit] = useState(10);
  const [popCategory, setPopCategory] = useState(null);
  const [rockCategory, setRockCategory] = useState(null);

  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // Get request Featured Playlists
  useEffect(() => {
    if (!popCategory) {
      spotifyApi.getCategoryPlaylists(
        "pop",
        { limit: 10, country: "us" },
        (err, result) => {
          setPopCategory(result.playlists.items);
        }
      );
    }

    if (!rockCategory) {
      spotifyApi.getCategoryPlaylists(
        "rock",
        { limit: 10, country: "us" },
        (err, result) => {
          setRockCategory(result.playlists.items);
        }
      );
    }
  }, [spotifyApi]);

  return (
    <div id="discover">
      <h1>Discover</h1>
      <section>
        <a
          onClick={() => {
            setCurrentOption("pop");
          }}
        >
          Pop
        </a>
        <a
          onClick={() => {
            setCurrentOption("rock");
          }}
        >
          Rock
        </a>
        <a
          onClick={() => {
            setCurrentOption("indieRock");
          }}
        >
          Indie Rock
        </a>
      </section>
      <section className="discoverRow">
        {currentOption == "pop" && popCategory && (
          <>
            <h2>Pop</h2>
            <div className="discoverPlaylistsRow">
              {popCategory.map((playlist, index) => {
                return (
                  <Link key={index} to={`/playlist/${playlist.id}`}>
                    <AlbumCard
                      img={playlist.images[0].url}
                      name={playlist.name}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {currentOption == "rock" && rockCategory && (
          <>
            <h2>rock</h2>
            <div className="discoverPlaylistsRow">
              {rockCategory.map((playlist, index) => {
                return (
                  <Link key={index} to={`/playlist/${playlist.id}`}>
                    <AlbumCard
                      img={playlist.images[0].url}
                      name={playlist.name}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Discover;

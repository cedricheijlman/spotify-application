import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";

import "./discover.css";
function Discover() {
  const accessKeyApi = sessionStorage.getItem("accessToken");
  const [currentOption, setCurrentOption] = useState("pop");
  const [limit, setLimit] = useState(10);
  const [popCategory, setPopCategory] = useState(null);
  const [rockCategory, setRockCategory] = useState(null);
  const [chillCategory, setChillCategory] = useState(null);
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

    if (!chillCategory) {
      spotifyApi.getCategoryPlaylists(
        "chill",
        { limit: 10, country: "us" },
        (err, result) => {
          setChillCategory(result.playlists.items);
        }
      );
    }
  }, [spotifyApi]);

  return (
    <div id="discover">
      <h1>Discover</h1>
      <section className="optionsRow">
        <p
          className={currentOption == "pop" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("pop");
          }}
        >
          Pop
        </p>
        <p
          className={currentOption == "rock" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("rock");
          }}
        >
          Rock
        </p>
        <p
          className={currentOption == "chill" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("chill");
          }}
        >
          Chill
        </p>
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
            <h2>Rock</h2>
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

        {currentOption == "chill" && chillCategory && (
          <>
            <h2>Chill</h2>
            <div className="discoverPlaylistsRow">
              {chillCategory.map((playlist, index) => {
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

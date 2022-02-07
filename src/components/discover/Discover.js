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
  const [soulCategory, setSoulCategory] = useState(null);
  const [indieAltCategory, setIndieAltCategory] = useState(null);
  const [hiphopCategory, setHiphopCategory] = useState(null);

  const [jazzCategory, setJazzCategory] = useState(null);
  const [rnbCategory, setRnbCategory] = useState(null);
  const [countryCategory, setCountryCategory] = useState(null);
  const [alternativeCategory, setAlternativeCategory] = useState(null);

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

    if (!hiphopCategory) {
      spotifyApi.getCategoryPlaylists(
        "hiphop",
        { limit: 10, country: "us" },
        (err, result) => {
          setHiphopCategory(result.playlists.items);
        }
      );
    }

    if (!soulCategory) {
      spotifyApi.getCategoryPlaylists(
        "soul",
        { limit: 10, country: "us" },
        (err, result) => {
          setSoulCategory(result.playlists.items);
        }
      );
    }

    if (!indieAltCategory) {
      spotifyApi.getCategoryPlaylists(
        "indie_alt",
        { limit: 10, country: "us" },
        (err, result) => {
          setIndieAltCategory(result.playlists.items);
        }
      );
    }

    if (!jazzCategory) {
      spotifyApi.getCategoryPlaylists(
        "jazz",
        { limit: 10, country: "us" },
        (err, result) => {
          setJazzCategory(result.playlists.items);
        }
      );
    }

    if (!rnbCategory) {
      spotifyApi.getCategoryPlaylists(
        "rnb",
        { limit: 10, country: "us" },
        (err, result) => {
          setRnbCategory(result.playlists.items);
        }
      );
    }

    if (!countryCategory) {
      spotifyApi.getCategoryPlaylists(
        "country",
        { limit: 10, country: "us" },
        (err, result) => {
          setCountryCategory(result.playlists.items);
        }
      );
    }

    if (!alternativeCategory) {
      spotifyApi.getCategoryPlaylists(
        "alternative",
        { limit: 10, country: "us" },
        (err, result) => {
          setAlternativeCategory(result.playlists.items);
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
        <p
          className={currentOption == "hiphop" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("hiphop");
          }}
        >
          Hip-Hop
        </p>
        <p
          className={currentOption == "soul" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("soul");
          }}
        >
          Soul
        </p>
        <p
          className={currentOption == "indieAlt" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("indieAlt");
          }}
        >
          Indie Alt
        </p>
        <p
          className={currentOption == "jazz" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("jazz");
          }}
        >
          Jazz
        </p>
        <p
          className={currentOption == "rnb" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("rnb");
          }}
        >
          RnB
        </p>
        <p
          className={currentOption == "country" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("country");
          }}
        >
          Country
        </p>
        <p
          className={currentOption == "alternative" ? "selected" : ""}
          onClick={() => {
            setCurrentOption("alternative");
          }}
        >
          Alternative
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

        {currentOption == "hiphop" && hiphopCategory && (
          <>
            <h2>Hip-Hop</h2>
            <div className="discoverPlaylistsRow">
              {hiphopCategory.map((playlist, index) => {
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

        {currentOption == "soul" && soulCategory && (
          <>
            <h2>Soul</h2>
            <div className="discoverPlaylistsRow">
              {soulCategory.map((playlist, index) => {
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

        {currentOption == "indieAlt" && indieAltCategory && (
          <>
            <h2>Indie Alt</h2>
            <div className="discoverPlaylistsRow">
              {indieAltCategory.map((playlist, index) => {
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

        {currentOption == "jazz" && indieAltCategory && (
          <>
            <h2>Jazz</h2>
            <div className="discoverPlaylistsRow">
              {jazzCategory.map((playlist, index) => {
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

        {currentOption == "rnb" && rnbCategory && (
          <>
            <h2>RnB</h2>
            <div className="discoverPlaylistsRow">
              {rnbCategory.map((playlist, index) => {
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

        {currentOption == "country" && countryCategory && (
          <>
            <h2>Country</h2>
            <div className="discoverPlaylistsRow">
              {countryCategory.map((playlist, index) => {
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

        {currentOption == "alternative" && alternativeCategory && (
          <>
            <h2>Alternative</h2>
            <div className="discoverPlaylistsRow">
              {alternativeCategory.map((playlist, index) => {
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

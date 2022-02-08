import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";
import "./searchpage.css";

function SearchPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  const [currentOption, setCurrentOption] = useState("albums");

  const [searchAlbums, setSearchAlbums] = useState("");
  const [albums, setAlbums] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(searchAlbums);
  }, [searchAlbums]);

  window.onscroll = function (ev) {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      if (currentOption == "albums") {
        changeOffset();
      }
    }
  };

  useEffect(() => {
    if (searchAlbums && searchAlbums !== "") {
      setLoading(true);
      spotifyApi.searchAlbums(
        searchAlbums,
        { offset: 0, limit: 50 },
        (err, result) => {
          setAlbums(result.albums);
          console.log(result);
        }
      );
      setLoading(false);
    }
  }, [searchAlbums]);

  const changeOffset = () => {
    if (albums && albums !== "") {
      console.log("worked");
      let offsetNew = albums.offset + 1;
      spotifyApi.searchAlbums(
        searchAlbums,
        { offset: offsetNew, limit: 50 },
        (err, result) => {
          console.log(result);
          setAlbums({
            ...albums,
            offset: offsetNew,
            items: [...albums.items, result.albums.items],
          });
        }
      );
    }
  };

  return (
    <div id="searchPage">
      <h1>Search {currentOption}</h1>
      <div className="optionsList">
        <p
          onClick={() => {
            setCurrentOption("albums");
          }}
          className={currentOption == "albums" ? "selected" : ""}
        >
          Albums
        </p>
        <p
          onClick={() => {
            setCurrentOption("tracks");
          }}
          className={currentOption == "tracks" ? "selected" : ""}
        >
          Tracks
        </p>
        <p
          onClick={() => {
            setCurrentOption("artists");
          }}
          className={currentOption == "artists" ? "selected" : ""}
        >
          Artists
        </p>
        <p
          onClick={() => {
            setCurrentOption("playlists");
          }}
          className={currentOption == "playlists" ? "selected" : ""}
        >
          Playlists
        </p>
      </div>

      {currentOption == "albums" && (
        <>
          <input
            onChange={(e) => {
              setSearchAlbums(e.target.value);
            }}
            placeholder="Search Albums"
          />
          <div className="searchRow">
            {albums &&
              searchAlbums &&
              searchAlbums !== "" &&
              albums !== "" &&
              albums.items.map((album) => {
                return (
                  <Link to={`/album/${album.id}`}>
                    <AlbumCard
                      name={album.name}
                      img={album.images[0] ? album.images[0].url : ""}
                      artist={album.artists[0].name}
                      artistId={album.artists[0].id}
                    />
                  </Link>
                );
              })}
            {loading == true ? <h1>Loading...</h1> : ""}
          </div>
        </>
      )}

      {currentOption == "tracks" && (
        <>
          <input placeholder="Search tracks" />
        </>
      )}

      {currentOption == "artists" && (
        <>
          <input placeholder="Search artists" />
        </>
      )}

      {currentOption == "playlists" && (
        <>
          <input placeholder="Search playlists" />
        </>
      )}
    </div>
  );
}

export default SearchPage;

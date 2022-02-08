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
  const [offset, setOffset] = useState({ albumOffset: 0, artistOffset: 0 });
  const [searchAlbums, setSearchAlbums] = useState("");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(searchAlbums);
    setOffset({ ...offset, albumOffset: 0 });
  }, [searchAlbums]);

  window.onscroll = function (ev) {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      if (currentOption == "albums" && albums.length !== 0) {
        setOffset({ ...offset, albumOffset: offset.albumOffset + 51 });
      }
    }
  };

  useEffect(() => {
    if (searchAlbums && searchAlbums !== "") {
      setLoading(true);
      spotifyApi.searchAlbums(
        searchAlbums,
        { offset: offset.albumOffset, limit: 50 },
        (err, result) => {
          if (offset.albumOffset !== 0) {
            setAlbums([...albums, ...result.albums.items]);
          } else {
            setAlbums(result.albums.items);
          }
        }
      );
      setLoading(false);
    }
  }, [offset]);
  console.log(albums);
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
              albums.length !== 0 &&
              albums.map((album) => {
                return (
                  <Link key={album.id} to={`/album/${album.id}`}>
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

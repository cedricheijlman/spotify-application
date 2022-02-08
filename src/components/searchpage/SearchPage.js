import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";
import ArtistCard from "../main/ArtistCard";
import "./searchpage.css";

function SearchPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  const [loading, setLoading] = useState(false);

  const [currentOption, setCurrentOption] = useState("albums");
  const [offset, setOffset] = useState({
    albumOffset: 0,
    artistOffset: 0,
    playlistOffset: 0,
  });

  const [searchAlbums, setSearchAlbums] = useState("");
  const [albums, setAlbums] = useState([]);

  const [searchArtists, setSearchArtists] = useState("");
  const [artists, setArtists] = useState([]);

  const [searchPlaylists, setSearchPlaylists] = useState("");
  const [playlists, setPlaylists] = useState([]);

  // Reset items
  useEffect(() => {
    setAlbums([]);
    setArtists([]);
    setPlaylists([]);

    setSearchAlbums("");
    setSearchArtists("");
    setSearchPlaylists("");
  }, [currentOption]);

  // Reset Page Offset
  useEffect(() => {
    setOffset({
      ...offset,
      albumOffset: 0,
      artistOffset: 0,
      playlistOffset: 0,
    });
  }, [searchAlbums, searchArtists, searchPlaylists]);

  // When user scrolls to bottom of page
  window.onscroll = function (ev) {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      if (currentOption == "albums" && albums.length !== 0) {
        setOffset({ ...offset, albumOffset: offset.albumOffset + 51 });
      }

      if (currentOption == "artists" && artists.length !== 0) {
        setOffset({ ...offset, artistOffset: offset.artistOffset + 51 });
      }

      if (currentOption == "playlists" && playlists.length !== 0) {
        setOffset({ ...offset, playlistOffset: offset.playlistOffset + 51 });
      }
    }
  };

  // Fetch search
  useEffect(() => {
    if (currentOption == "albums" && searchAlbums && searchAlbums !== "") {
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
    }

    if (currentOption == "artists" && searchArtists && searchArtists !== "") {
      setLoading(true);
      spotifyApi.searchArtists(
        searchArtists,
        { offset: offset.artistOffset, limit: 50 },
        (err, result) => {
          if (offset.artistOffset !== 0) {
            setArtists([...artists, ...result.artists.items]);
          } else {
            setArtists(result.artists.items);
          }
        }
      );
    }

    if (currentOption == "playlists" && playlists && searchPlaylists !== "") {
      spotifyApi.searchPlaylists(
        searchPlaylists,
        { offset: offset.playlistOffset, limit: 50 },
        (err, result) => {
          console.log(result);
          if (offset.playlistOffset !== 0) {
            setPlaylists([...playlists, ...result.playlists.items]);
          } else {
            setPlaylists(result.playlists.items);
          }
        }
      );
    }
  }, [offset]);

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
          <input
            onChange={(e) => {
              setSearchArtists(e.target.value);
            }}
            placeholder="Search artists"
          />
          <div className="searchRow">
            {artists.length !== 0 &&
              artists.map((artist) => {
                return (
                  <Link to={`/artist/${artist.id}`}>
                    <ArtistCard
                      img={artist.images[0] ? artist.images[0].url : ""}
                      artistName={artist.name}
                    />
                  </Link>
                );
              })}
          </div>
        </>
      )}

      {currentOption == "playlists" && (
        <>
          <input
            onChange={(e) => {
              setSearchPlaylists(e.target.value);
            }}
            placeholder="Search Playlists"
          />
          <div className="searchRow">
            {playlists.length !== 0 &&
              playlists.map((playlist) => {
                return <h1>{playlist.name}</h1>;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;

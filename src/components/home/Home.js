import { useContext, useEffect, useState } from "react";
import "./home.css";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import NewReleases from "./NewReleases";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AlbumCard from "../main/AlbumCard";
function Home() {
  const accessKeyApi = sessionStorage.getItem("accessToken");
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [currentOption, setCurrentOption] = useState("newReleases");
  const [newReleases, setNewReleases] = useState(null);
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // Get request Featured Playlists
  useEffect(() => {
    if (!featuredPlaylists) {
      spotifyApi.getFeaturedPlaylists({ limit: 20 }, (err, data) => {
        setFeaturedPlaylists(data);
      });
    }

    if (!newReleases) {
      spotifyApi.getNewReleases({}, (err, result) => {
        setNewReleases(result.albums.items);
      });
    }
  }, [spotifyApi]);
  console.log(newReleases);
  return (
    <div id="home">
      <div className="home__choose">
        <p
          onClick={() => {
            setCurrentOption("newReleases");
          }}
        >
          New Releases
        </p>
        <p
          onClick={() => {
            setCurrentOption("featuredPlaylists");
          }}
        >
          Featured Playlists
        </p>
        <p
          onClick={() => {
            setCurrentOption("featured");
          }}
        >
          Editor's Picks
        </p>
        <p
          onClick={() => {
            setCurrentOption("featured");
          }}
        >
          Editor's Picks
        </p>
      </div>

      {newReleases !== null && currentOption == "newReleases" && (
        <>
          <h1>New Releases</h1>
          <div className="homeRow">
            {newReleases.map((album) => {
              return (
                <Link to={`/album/${album.id}`}>
                  <AlbumCard
                    name={album.name}
                    artist={album.artists[0].name}
                    artistId={album.artists[0].id}
                    img={album.images[0].url}
                  />
                </Link>
              );
            })}
          </div>
        </>
      )}

      {featuredPlaylists !== null && currentOption == "featuredPlaylists" && (
        <>
          <h1>Featured Playlists</h1>
          <div className="homeRow">
            <NewReleases featuredPlaylists={featuredPlaylists} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

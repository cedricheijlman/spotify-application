import { useContext, useEffect, useState } from "react";
import "./home.css";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import NewReleases from "./NewReleases";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Home() {
  const accessKeyApi = sessionStorage.getItem("accessToken");
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [currentOption, setCurrentOption] = useState("featuredPlaylists");
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // Get request Featured Playlists
  useEffect(() => {
    if (!featuredPlaylists) {
      spotifyApi.getFeaturedPlaylists({ limit: 50 }, (err, data) => {
        setFeaturedPlaylists(data);
        console.log(data);
      });
    }

    spotifyApi.getCategoryPlaylists("pop", { limit: 50 }, (err, result) => {
      console.log(result);
    });
  }, [spotifyApi]);

  return (
    <div id="home">
      <div className="home__choose">
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
        <p
          onClick={() => {
            setCurrentOption("featured");
          }}
        >
          Editor's Picks
        </p>
      </div>
      <div className="featuredPlaylistsRow">
        {featuredPlaylists !== null && currentOption == "featuredPlaylists" && (
          <NewReleases featuredPlaylists={featuredPlaylists} />
        )}
      </div>
    </div>
  );
}

export default Home;

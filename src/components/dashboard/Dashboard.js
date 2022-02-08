import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";
import { Link, Route, Routes } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import Home from "../home/Home";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import PlaylistPage from "../playlistpage/PlaylistPage";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import AlbumPage from "../albumpage/AlbumPage";
import ArtistPage from "../artistpage/ArtistPage";
import { AccountCircleOutlined } from "@mui/icons-material";
import ProfilePage from "../userpage/ProfilePage";
import Discover from "../discover/Discover";
import SearchIcon from "@mui/icons-material/Search";
import SearchPage from "../searchpage/SearchPage";

function Dashboard({ accessKeyApi }) {
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);
  const [play, setPlay] = useState(false);

  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // Play
  useEffect(() => setPlay(true), [currentTrack]);

  // function Logout

  const logOut = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href =
      window.location.href !== "http://localhost:3000/"
        ? "https://spotify-application.netlify.app/"
        : "http://localhost:3000";
  };

  return (
    <>
      <div id="dashboard">
        <div className="dashboard__left">
          <div className="dashboard__logo">
            <h1>Logo</h1>
          </div>
          <Link to="/">
            <div className="dashboard__category">
              <HomeOutlinedIcon className="category__logo" />
              <p>Home</p>
            </div>
          </Link>
          <Link to="/search">
            <div className="dashboard__category">
              <SearchIcon className="category__logo" />
              <p>Search</p>
            </div>
          </Link>
          <Link to="/discover">
            <div className="dashboard__category">
              <ExploreOutlinedIcon className="category__logo" />
              <p>Discover</p>
            </div>
          </Link>
          <Link to={`/profile`}>
            <div className="dashboard__category">
              <AccountCircleOutlined className="category__logo" />
              <p>Profile</p>
            </div>
          </Link>
          <a onClick={logOut}>
            <div className="dashboard__category">
              <AccountCircleOutlined className="category__logo" />
              <p>Logout</p>
            </div>
          </a>
        </div>
        <div className="dashboard__right">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <div className="player">
          <SpotifyPlayer
            autoPlay={true}
            uris={currentTrack ? [`${currentTrack}`] : []}
            token={accessKeyApi}
            callback={(state) => {
              if (!state.isPlaying) setPlay(false);
            }}
            play={play}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";
import { Link, Route, Routes } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import Home from "../home/Home";

function Dashboard({ accessKeyApi }) {
  let spotifyApi = new SpotifyWebApi();
  const [result, setResult] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
    setResult("done");
    spotifyApi.getFeaturedPlaylists({}, (res) => {
      console.log(res);
    });
  }, [accessKeyApi]);

  return (
    <>
      <div id="dashboard">
        <div className="dashboard__left">
          <div className="dashboard__logo">
            <h1>Logo</h1>
          </div>
          <div className="dashboard__category">
            <Link to="/">
              <HomeOutlinedIcon className="category__logo" />
              <p>Home</p>
            </Link>
          </div>

          <div className="dashboard__category">
            <Link to="/discover">
              <ExploreOutlinedIcon className="category__logo" />
              <p>Discover</p>
            </Link>
          </div>
        </div>
        <div className="dashboard__right">
          <Routes>
            <Route path="/" element={<Home spotifyApi={spotifyApi} />} />
            <Route path="/discover" element={<h1>Discover</h1>} />
          </Routes>
        </div>
        <div className="player">
          <SpotifyPlayer token={accessKeyApi} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

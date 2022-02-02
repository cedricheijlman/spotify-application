import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";

let spotifyApi = new SpotifyWebApi();

function Dashboard({ accessKeyApi }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
  }, []);

  return (
    <>
      <div id="dashboard">
        <div className="dashboard__left"></div>
        <div className="dashboard__right"></div>
        <div className="player">
          <SpotifyPlayer token={accessKeyApi} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

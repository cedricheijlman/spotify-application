import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "react-spotify-web-playback";

let spotifyApi = new SpotifyWebApi();

function Dashboard({ accessKeyApi }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
  }, [accessKeyApi]);

  return (
    <>
      <div id="dashboard">
        <div className="dashboard__left">
          <div className="logo">
            <h2>Logo</h2>
          </div>
          <div>
            <h2>Logo</h2>
          </div>
        </div>
        <div className="dashboard__right"></div>
        <div className="player">
          <SpotifyPlayer
            uris={["spotify:album:6Fr2rQkZ383FcMqFyT7yPr"]}
            token={accessKeyApi}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
let spotifyApi = new SpotifyWebApi();

function Dashboard({ accessKeyApi }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
  }, []);

  return <div>{}</div>;
}

export default Dashboard;

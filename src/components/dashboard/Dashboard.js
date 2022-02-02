import React, { useEffect } from "react";

import SpotifyWebApi from "spotify-web-api-js";

function Dashboard({ accessKey }) {
  useEffect(() => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessKey);
  }, []);
  return <div>{accessKey}</div>;
}

export default Dashboard;

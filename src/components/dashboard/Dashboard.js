import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SpotifyWebApi from "spotify-web-api-js";
let spotifyApi = new SpotifyWebApi();

function Dashboard({ accessKeyApi }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
  }, []);

  useEffect(() => {
    spotifyApi.getMyCurrentPlayingTrack({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        setResult(data);
      }
    });
  }, []);

  return <div>{result && <h1>{result.item.name}</h1>}</div>;
}

export default Dashboard;

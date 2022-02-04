import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./userpage.css";
function UserPage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    spotifyApi.getMe((err, result) => {
      console.log(result);
    });
  }, []);
  return <div>User Page</div>;
}

export default UserPage;

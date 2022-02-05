import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./profilepage.css";
function ProfilePage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);
  const [profile, setProfile] = useState(null);

  // getProfile
  useEffect(() => {
    spotifyApi.getMe((err, result) => {
      console.log(result);
      setProfile(result);
    });
  }, []);

  return (
    <>
      {profile && (
        <div id="profilePage">
          <div className="profilePage__profile">
            <img
              src={
                profile.images.length !== 0
                  ? profile.images[0].url
                  : "https://85.be/wp-content/uploads/2021/11/yorben.jpg"
              }
            />
            <div>
              <p>{profile.product} Member</p>
              <h2>{profile.display_name}</h2>
              <p>{profile.followers.total} Followers</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;

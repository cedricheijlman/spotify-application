import { useEffect, useState } from "react";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import { CurrentTrackContext } from "./CurrentTrackContext";

function App() {
  const [accessKeyApi, setAccessKeyApi] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  // get Client ID From .env File
  const client_id = process.env.REACT_APP_CLIENT_ID;

  // Url for spotify Authentication
  const redirect_uri =
    window.location.href !== "http://localhost:3000/"
      ? "https://spotify-application.netlify.app/"
      : "http://localhost:3000";
  const scope =
    "user-read-private user-read-playback-state user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-collaborative";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + client_id;
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + redirect_uri;

  // If Accesskey hasn't been set yet, set Accesskey to sessionStorage after login
  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") === null ||
      sessionStorage.getItem("accessToken") === ""
    ) {
      const accessKeyApiUrl = window.location.hash.substring(
        14,
        window.location.hash.indexOf("&")
      );
      sessionStorage.setItem("accessToken", `${accessKeyApiUrl}`);
      setAccessKeyApi(accessKeyApiUrl);
      window.location.hash = "";
    }
  }, []);

  // set sessionStorage accessToken to current AccessToken
  useEffect(() => {
    if (
      sessionStorage.getItem("accessToken") !== null &&
      sessionStorage.getItem("access") !== ""
    ) {
      setAccessKeyApi(`${sessionStorage.getItem("accessToken")}`);
    }
  }, []);

  return (
    <div className="App">
      <CurrentTrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
        {sessionStorage.getItem("accessToken") !== "" &&
        sessionStorage.getItem("accessToken") !== null ? (
          <Dashboard
            accessKeyApi={
              accessKeyApi
                ? accessKeyApi
                : sessionStorage.getItem("accessToken")
            }
          />
        ) : (
          <Login url={url} />
        )}
      </CurrentTrackContext.Provider>
    </div>
  );
}

export default App;

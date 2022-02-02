import { useEffect, useState } from "react";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";

function App() {
  const [accessKeyApi, setAccessKey] = useState(null);
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = "http://localhost:3000";

  const scope =
    "user-read-private user-read-playback-state user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-collaborative";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + client_id;
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + redirect_uri;

  useEffect(() => {
    const accessKeyApi = window.location.hash.substring(
      14,
      window.location.hash.indexOf("&")
    );
    setAccessKey(accessKeyApi);
  }, []);
  return (
    <div className="App">
      {accessKeyApi ? (
        <Dashboard accessKeyApi={accessKeyApi} />
      ) : (
        <Login url={url} />
      )}
    </div>
  );
}

export default App;

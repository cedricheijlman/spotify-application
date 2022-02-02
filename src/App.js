import { useEffect, useState } from "react";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";

function App() {
  const [accessKey, setAccessKey] = useState(null);
  const client_id = "a50a34afe4fb4f0a92b1ef6647595070";
  const redirect_uri = "http://localhost:3000";

  const scope =
    "user-read-private user-read-email user-library-read user-follow-read user-top-read user-read-recently-played playlist-read-collaborative";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + client_id;
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + redirect_uri;

  useEffect(() => {
    const accessKey = window.location.hash.substring(
      14,
      window.location.hash.indexOf("&")
    );
    setAccessKey(accessKey);
  }, []);
  return (
    <div className="App">
      {accessKey ? <Dashboard accessKey={accessKey} /> : <Login url={url} />}
    </div>
  );
}

export default App;

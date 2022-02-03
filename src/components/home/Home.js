import { useEffect, useState } from "react";
import "./home.css";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import NewReleases from "./NewReleases";
function Home() {
  const accessKeyApi = sessionStorage.getItem("accessToken");

  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);
  useEffect(() => {
    if (!featuredPlaylists) {
      spotifyApi.getFeaturedPlaylists({ limit: 50 }, (err, data) => {
        setFeaturedPlaylists(data);
        console.log(data);
      });
    }
  }, [spotifyApi]);
  return (
    <div id="home">
      <div className="home__choose">
        <p>Editor's Picks</p>
        <p>Editor's Picks</p>
        <p>Editor's Picks</p>
        <p>Editor's Picks</p>
      </div>
      <div className="featuredPlaylistsRow">
        {featuredPlaylists !== null && (
          <NewReleases featuredPlaylists={featuredPlaylists} />
        )}
      </div>
    </div>
  );
}

export default Home;

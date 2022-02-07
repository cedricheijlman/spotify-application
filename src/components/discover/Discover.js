import React, { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import "./discover.css";
function Discover() {
  const accessKeyApi = sessionStorage.getItem("accessToken");
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);
  const [limit, setLimit] = useState(10);
  const [discover, setDiscover] = useState({
    pop: null,
    hiphop: null,
    rock: null,
    chill: null,
    indie_alt: null,
  });
  // Initialize Wrapper and set AccessCode
  let spotifyApi = new SpotifyWebApi();
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);

  // Get request Featured Playlists
  useEffect(() => {
    if (!discover.pop) {
      spotifyApi.getCategoryPlaylists(
        "pop",
        { limit: 10, country: "us" },
        (err, result) => {
          console.log(result);
          setDiscover({ ...discover, pop: result.playlists.items });
        }
      );
    }
  }, [spotifyApi]);

  return (
    <div id="discover">
      <h1>Discover</h1>
      <section className="discoverRow">
        <h2>Pop</h2>
        <div className="discoverPlaylistsRow">
          {discover.pop &&
            discover.pop.map((playlist) => {
              return <h1>{playlist.name}</h1>;
            })}
        </div>
      </section>
    </div>
  );
}

export default Discover;

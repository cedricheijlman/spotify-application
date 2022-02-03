import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

function useSpotifyWrapper(accessKeyApi, spotifyApi) {
  useEffect(() => {
    spotifyApi.setAccessToken(accessKeyApi);
  }, [accessKeyApi]);

  return spotifyApi;
}

export default useSpotifyWrapper;

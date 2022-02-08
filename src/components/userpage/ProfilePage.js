import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import { CurrentTrackContext } from "../../CurrentTrackContext";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import AlbumCard from "../main/AlbumCard";
import ArtistCard from "../main/ArtistCard";
import Track from "../main/Track";
import "./profilepage.css";
function ProfilePage() {
  // Initialise Wrapper Spotify API
  const accessKeyApi = sessionStorage.getItem("accessToken");
  let spotifyApi = new SpotifyWebApi();

  // Set AccessCode Spotify API
  const setAccessCode = useSpotifyWrapper(accessKeyApi, spotifyApi);
  const [profile, setProfile] = useState(null);
  const [currentOption, setCurrentOption] = useState("topArtists");
  const [profileTopArtists, setProfileTopArtists] = useState({
    artists: [],
    limit: 10,
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState({
    tracks: [],
    limit: 20,
  });
  const [topTracks, setTopTracks] = useState({
    tracks: [],
    limit: 20,
  });

  const [playlists, setPlaylists] = useState({
    playlists: [],
    limit: 20,
  });

  // getProfile
  useEffect(() => {
    spotifyApi.getMe((err, result) => {
      setProfile(result);
    });
  }, []);

  // setState currentTrack
  const { currentTrack, setCurrentTrack } = useContext(CurrentTrackContext);

  // get top artists
  useEffect(() => {
    spotifyApi.getMyTopArtists(
      { limit: profileTopArtists.limit },
      (err, result) => {
        setProfileTopArtists({ ...profileTopArtists, artists: result.items });
      }
    );
  }, []);

  // get Top Listened Tracks
  useEffect(() => {
    spotifyApi.getMyTopTracks({ limit: topTracks.limit }, (err, result) => {
      setTopTracks({ ...topTracks, tracks: result.items });
    });
  }, []);

  // get Recently played tracks
  useEffect(() => {
    spotifyApi.getMyRecentlyPlayedTracks(
      { limit: recentlyPlayed.limit },
      (err, result) => {
        setRecentlyPlayed({ ...recentlyPlayed, tracks: result.items });
      }
    );
  }, []);

  // get user playlists
  useEffect(() => {
    spotifyApi.getUserPlaylists({}, (err, result) => {
      setPlaylists({ ...playlists, playlists: result.items });
    });
  }, []);

  // Track length
  const getSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

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
          <div className="profilePage__options">
            <p
              className={currentOption == "topArtists" ? "selected" : ""}
              onClick={() => setCurrentOption("topArtists")}
            >
              Top Artists
            </p>
            <p
              className={currentOption == "topTracks" ? "selected" : ""}
              onClick={() => setCurrentOption("topTracks")}
            >
              Top Tracks
            </p>
            <p
              className={currentOption == "recentlyPlayed" ? "selected" : ""}
              onClick={() => setCurrentOption("recentlyPlayed")}
            >
              Recently Played
            </p>
            <p
              className={currentOption == "playlists" ? "selected" : ""}
              onClick={() => setCurrentOption("playlists")}
            >
              Playlists
            </p>
          </div>
          {currentOption == "topArtists" && (
            <div className="profilePage__stats">
              <h2>Top Artists</h2>
              <div className="profilePage__row">
                {profileTopArtists &&
                  profileTopArtists.artists.length > 0 &&
                  profileTopArtists.artists.map((artist, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Link to={`/artist/${artist.id}`}>
                          <ArtistCard
                            img={artist.images[0].url}
                            artistName={artist.name}
                          />
                        </Link>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "topTracks" && (
            <div className="profilePage__stats">
              <h2>Top Tracks</h2>
              <div className="profilePage__row">
                {topTracks.tracks.length > 0 &&
                  topTracks.tracks.map((track, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Track
                          item={track}
                          index={index}
                          setCurrentTrack={setCurrentTrack}
                          getSeconds={getSeconds}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "recentlyPlayed" && (
            <div className="profilePage__stats">
              <h2>Recently Played</h2>
              <div className="profilePage__row">
                {recentlyPlayed.tracks.length > 0 &&
                  recentlyPlayed.tracks.map((track, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Track
                          item={track.track}
                          index={index}
                          setCurrentTrack={setCurrentTrack}
                          getSeconds={getSeconds}
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "playlists" && (
            <div className="profilePage__stats">
              <h2>Playlists</h2>
              <div className="profilePage__row">
                {playlists.playlists.length > 0 &&
                  playlists.playlists.map((playlist) => {
                    return (
                      <Link to={`/playlist/${playlist.id}`}>
                        <AlbumCard
                          name={playlist.name}
                          img={playlist.images[0] ? playlist.images[0].url : ""}
                        />
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfilePage;

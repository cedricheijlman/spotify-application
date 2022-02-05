import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyWrapper from "../../useSpotifyWrapper";
import ArtistCard from "../main/ArtistCard";
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
  // getProfile
  useEffect(() => {
    spotifyApi.getMe((err, result) => {
      console.log(result);
      setProfile(result);
    });
  }, []);

  useEffect(() => {
    spotifyApi.getMyTopArtists(
      { limit: profileTopArtists.limit },
      (err, result) => {
        console.log(result);
        setProfileTopArtists({ ...profileTopArtists, artists: result.items });
      }
    );
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
                  profileTopArtists.artists.map((artist) => {
                    return (
                      <Link to={`/artist/${artist.id}`}>
                        <ArtistCard
                          img={artist.images[0].url}
                          artistName={artist.name}
                        />
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "topTracks" && (
            <div className="profilePage__stats">
              <h2>Top Tracks</h2>
              <div className="profilePage__row"></div>
            </div>
          )}

          {currentOption == "recentlyPlayed" && (
            <div className="profilePage__stats">
              <h2>Recently Played</h2>
              <div className="profilePage__row"></div>
            </div>
          )}

          {currentOption == "playlists" && (
            <div className="profilePage__stats">
              <h2>Playlists</h2>
              <div className="profilePage__row"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfilePage;

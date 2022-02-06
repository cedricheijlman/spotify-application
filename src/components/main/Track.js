import React from "react";
import { Link } from "react-router-dom";
import "./track.css";
function Track({ setCurrentTrack, index, item, getSeconds }) {
  return (
    <div
      onClick={(e) => {
        if (e.target.localName !== "h6" && e.target.localName !== "img") {
          setCurrentTrack(item.uri);
          console.log(e);
        }
      }}
      className="playlistPage__trackItem"
    >
      <div className="playlistPage__trackItemLeft">
        <div
          style={{
            width: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <p className="trackNumber">{index + 1}</p>
        </div>
        <Link
          title={item.album.name !== null && item.album.name}
          to={`/album/${item.album.id !== null && item.album.id}`}
        >
          <img
            height={60}
            src={item.album.images[0] ? item.album.images[0].url : ""}
          />
        </Link>
        <div className="trackNameAndArtist">
          <h5>{item.name}</h5>
          <div>
            {item.artists.map((artist, index) => (
              <Link to={`/artist/${artist.id}`} key={index}>
                <h6>{artist.name}</h6>
                <span style={{ fontWeight: 200 }}>
                  {item.artists.length - 1 !== index ? ", " : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="time">{getSeconds(item.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Track;

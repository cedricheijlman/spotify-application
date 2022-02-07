import React from "react";
import { Link } from "react-router-dom";
import "./artistcard.css";
function AlbumCard({ name, img, releaseDate, artist, artistId }) {
  return (
    <div className="artistAlbum__item">
      <img src={img} />
      <h5>{name}</h5>
      {releaseDate && <p>{releaseDate}</p>}
      {artist && artistId && (
        <Link to={`artist/${artistId}`}>
          <p
            style={{ textAlign: "center", fontSize: "13px", fontWeight: "500" }}
          >
            {artist}
          </p>
        </Link>
      )}
    </div>
  );
}

export default AlbumCard;

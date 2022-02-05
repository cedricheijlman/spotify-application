import React from "react";
import "./artistcard.css";
function AlbumCard({ name, img, releaseDate }) {
  return (
    <div className="artistAlbum__item">
      <img src={img} />
      <h5>{name}</h5>
      <p>{releaseDate}</p>
    </div>
  );
}

export default AlbumCard;

import React from "react";
import "./artistcard.css";
function ArtistCard({ img, artistName }) {
  return (
    <div className="artistAlbum__item">
      <img style={{ borderRadius: "50%" }} src={img} />
      <h5>{artistName}</h5>
    </div>
  );
}

export default ArtistCard;

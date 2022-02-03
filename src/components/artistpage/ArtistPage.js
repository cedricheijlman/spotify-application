import React from "react";
import "./artistpage.css";

function ArtistPage() {
  // get Artist ID from url
  const artistId = window.location.pathname.slice(8);
  console.log(artistId);
  return <div>Artist Page</div>;
}

export default ArtistPage;

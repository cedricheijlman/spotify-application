import React from "react";
import { Link } from "react-router-dom";
function NewReleases({ featuredPlaylists }) {
  return featuredPlaylists.playlists.items.map((item) => {
    return (
      <div key={item.id} className="featuredPlaylistsItem">
        <Link to={`/playlist/${item.id}`}>
          <img src={item.images[0].url} />
        </Link>
        <Link to={`/playlist/${item.id}`}>
          <p>{item.name}</p>
        </Link>
      </div>
    );
  });
}

export default NewReleases;

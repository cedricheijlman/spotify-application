import React from "react";
import "./login.css";
function Login({ url }) {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/64/05/31/6405318ac146473a95bfbdcec2b32943.gif)",
      }}
      className="loginPage"
    >
      <h2>Spotify V2 Web App </h2>
      <p>The better spotify </p>
      <div className="login">
        <i className="fab fa-spotify"></i>
        <a href={url}>Login with spotify</a>
      </div>
    </div>
  );
}

export default Login;

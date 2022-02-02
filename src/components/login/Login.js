import React from "react";
import "./login.css";
function Login({ url }) {
  return (
    <div className="loginPage">
      <h2>Text</h2>
      <div className="login">
        <i className="fab fa-spotify"></i>
        <a href={url}>Login with spotify</a>
      </div>
    </div>
  );
}

export default Login;

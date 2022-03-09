import React from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useState } from "react";
// const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

const REACT_APP_GOOGLE_CLIENT_ID =
  "645822534725-ck9p7n5ofoih2olrh9td6rnoo656aklt.apps.googleusercontent.com";

const Login = (props) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
    });

    const data = await res.json();
    setLoginData(data);

    localStorage.setItem("loginData", JSON.stringify(data));
  };

  return (
    <div>
      <header className="appHeader">
        <h1>MOVIE APP</h1>
      </header>
      <div className="loginContainer">
        {loginData ? (
          <div>
            {" "}
            <div>loggedOut</div>
            <button onClick={handleLogout()}></button>
          </div>
        ) : (
          <GoogleLogin
            //! change env for a local variable
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        )}
      </div>
    </div>

    /* <div className="Login">
        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Roboto:400"
        />
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with Google</b>
          </p>
        </div>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign up with Google</b>
          </p>
        </div>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Continue with Google</b>
          </p>
        </div>
        <div className="normal-btn">
          <p className="btn-text">
            <b onClick={() => navigate("/app")}>Button</b>
          </p>
        </div>
      </div> */
  );

  // );
};

export default Login;

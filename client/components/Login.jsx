import React, { useContext } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import { UserDataContext } from "../context.js"
// const dotenv = require("dotenv");
// const { OAuth2Client } = require("google-auth-library");

const REACT_APP_GOOGLE_CLIENT_ID =
  "645822534725-ck9p7n5ofoih2olrh9td6rnoo656aklt.apps.googleusercontent.com";

const Login = (props) => {
  const [ userData, setUserData ] = useContext(UserDataContext);
  const navigate = useNavigate();

  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem("loginData")
  //     ? JSON.parse(localStorage.getItem("loginData"))
  //     : null
  // );

  const handleLogout = () => {
    // localStorage.removeItem("loginData");
    // setUserData(null);
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
    // setLoginData(data);
    setUserData(data)
  
    // await localStorage.setItem("loginData", JSON.stringify(data));
    navigate('/app')
  };

  return (
    <div>
      <header className="appHeader">
        <h1>MOVIE APP</h1>
      </header>
      <div className="loginContainer">
        {props.userData ? (
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

  );

};

export default Login;

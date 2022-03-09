import React from "react";
import "../styles/login.css";

const Login = (props) => {
  return (
    <div className="loginContainer">
      <div className="Login">
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
            <b>Button</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

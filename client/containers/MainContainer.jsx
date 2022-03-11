import React, { useState, useContext } from "react";
import BodyContainer from "./BodyContainer.jsx";
import { useEffect } from "react";
import { connect, useStore } from "react-redux";
import * as actions from "../actions/actions.js";
import {UserDataContext} from "../context.js"
import Logo from '../images/logo/ShowTimeLogo.jpg'
import Account from "../components/Account.jsx"; 

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
});

// running dispatch load movies
// hard coding user to David
// immediately loading david's account with useEffect
const MainContainer = (props) => {
  const [userData, setUserData] = useContext(UserDataContext)

  useEffect(async () => {
    //! no need to hard code argument for loadMovies once username has been saved in state
    //! follwoing authentication stage (to be implemented)
    console.log('this is local storage', localStorage.getItem('loginData'));
    return props.loadMovies(userData.name);
  }, []);

  /*
    style={{backgroundImage: `url(${backgroundImage})`}
  */

  return (
    //! HeadContainer component goes here
    //header
    <div className="outerMainContainer">
      <div className="module">
        <h2 className="stripes"><img className="logo" src={Logo} alt="Logo" />  </h2>
      
      </div>
      <Account />
      {/* <div style={{backgroundImage: `url(${logo})`, width:"200px", height: "200px"}}> </div> */}
      <div className="main-container">
        <h1>Movie Fads</h1>
        <BodyContainer />
      </div>
    </div>
    //! FooterContainer component goes here
  );
};

export default connect(null, mapDispatchToProps)(MainContainer);

import React, { useState, useContext } from "react";
import BodyContainer from "./BodyContainer.jsx";
import { useEffect } from "react";
import { connect, useStore } from "react-redux";
import * as actions from "../actions/actions.js";
import {UserDataContext} from "../context.js"

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

  return (
    //! HeadContainer component goes here
    <div className="main-container">
      <h1>Movie Fads</h1>
      <h2>{userData?.name}</h2>
      <img src={userData?.picture} />
      <BodyContainer />
    </div>
    //! FooterContainer component goes here
  );
};

export default connect(null, mapDispatchToProps)(MainContainer);

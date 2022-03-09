import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
});

//! Buttons need on click functions
//! Functions will dispatch actoins, through mapDispatchToProps
const Buttons = (props) => {
  const handleClick = (input) => {
    const category = {};

    console.log("tmdbId:", props.tmdbId);
    category.TMDBid = props.tmdbId;

    switch (input) {
      case "toWatch":
        category.toWatch = true;
        break;
      case "fav":
        category.fav = true;
        break;
      case "haveSeen":
        category.haveSeen = true;
    }

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    };

    fetch(props.urlBase + "chloe", options)
      .then(() => props.loadMovies("chloe"))
      .catch((err) => console.log("This err is in button:", err));
  };

  const buttons = [];
  if (props.button1) // add to watchlist 
    buttons.push(
      <button type="button" onClick={() => handleClick("toWatch")}>
        {props.button1}
      </button>
    );
  if (props.button2) // add to favorites
    buttons.push(
      <button type="button" onClick={() => handleClick("fav")}>
        {" "}
        {props.button2}
      </button>
    );
  if (props.button3) // 
    buttons.push(
      <button type="button" onClick={() => handleClick("haveSeen")}>
        {" "}
        {props.button3}
      </button>
    );

  return <div className="buttons">{buttons}</div>;
};

Buttons.defaultProps = {
  button1: "Add to Watchlist",
  button2: "Add to Favorites",
  button3: "Mark as Watched",
};

export default connect(null, mapDispatchToProps)(Buttons);

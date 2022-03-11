import React, { useContext } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { UserDataContext } from "../context.js";
import watchLaterSmall from "../images/logo/watchLater.svg";

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
});

// ! Buttons need on click functions
// ! Functions will dispatch actoins, through mapDispatchToProps
const Buttons = (props) => {
  const userData = useContext(UserDataContext)[0];
  const handleClick = (input) => {
    const category = {};

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

    fetch(props.urlBase + userData.name, options)
      .then(() => props.loadMovies(userData.name))
      .catch((err) => console.log("This err is in button:", err));
  };

  const buttons = [];
<<<<<<< HEAD
  if (props.button1)
=======
  if (props.button1 && props.currRow !== "toWatch")
>>>>>>> 142476d65dc3baba9642ab069db6d40ed89b2d8b
    // add to watchlist
    buttons.push(
      <button
        key="button1"
        type="button"
        onClick={() => handleClick("toWatch")}
      >
        {props.button1}
      </button>
    );
<<<<<<< HEAD
  if (props.button2)
=======
  if (props.button2 && props.currRow !== "fav")
>>>>>>> 142476d65dc3baba9642ab069db6d40ed89b2d8b
    // add to favorites
    buttons.push(
      <button key="button2" type="button" onClick={() => handleClick("fav")}>
        {" "}
        {props.button2}
      </button>
    );
<<<<<<< HEAD
  if (props.button3)
=======
  if (props.button3 && props.currRow !== "haveSeen")
>>>>>>> 142476d65dc3baba9642ab069db6d40ed89b2d8b
    //
    buttons.push(
      <button
        key="button3"
        type="button"
        onClick={() => handleClick("haveSeen")}
      >
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

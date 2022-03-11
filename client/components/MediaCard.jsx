import React, { useContext } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import Poster from "./Poster.jsx";
import Buttons from "./Buttons.jsx";
import { UserDataContext } from "../context.js";

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
});

const MediaCard = (props) => {
  const [userData, setUserData] = useContext(UserDataContext);

  const handleClick = () => {
    const { tmdbId, currRow } = props;
    const category = { TMDBid: tmdbId };

    switch (currRow) {
      case "toWatch":
        category.toWatch = false;
        break;
      case "fav":
        category.fav = false;
        break;
      case "haveSeen":
        category.haveSeen = false;
    }

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    };

    fetch("changeMedia/" + userData.name, options)
      .then(() => props.loadMovies(userData.name))
      .catch((err) => console.log("This err is in button:", err));
  };

  return (
    <div className="media-card">
      <div className="mediaCard">
        <Poster key={`poster ${props.key}`} tmdbId={props.tmdbId} />
      </div>
      <div className="buttons">
        <Buttons
          urlBase="changeMedia/"
          tmdbId={props.tmdbId}
          currRow={props.currRow}
        />
        <button className="deleteCategory" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MediaCard);

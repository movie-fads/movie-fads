import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import Poster from "./Poster.jsx";
import Buttons from "./Buttons.jsx";

// const mapDispatchToProps = (dispatch) => ({
//   loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
// });

const SearchBarMedia = (props) => {
  return (
    <div className="media-card">
      <div className="mediaCard">
        <Poster key={`poster ${props.key}`} tmdbId={props.tmdbId} />
      </div>
      <div className="buttons">
        <Buttons urlBase="/" tmdbId={props.tmdbId} />
      </div>
    </div>
  );
};

export default SearchBarMedia;

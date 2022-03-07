import React from 'react';
import BodyContainer from './BodyContainer.jsx';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapDispatchToProps = (dispatch) => ({
  loadMovies: () => actions.fetchUserMovieList(dispatch),
});

const MainContainer = (props) => {
  useEffect(() => {
    props.loadMovies();
  }, []);
  return (
    //HeadContainer component goes here
    <div className="main-container">
      <h1>Movie Fads</h1>
      <BodyContainer />
    </div>
    //FooterContainer component goes here
  );
};

export default connect(null, mapDispatchToProps)(MainContainer);

import React from 'react';
import BodyContainer from './BodyContainer.jsx';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(actions.fetchUserMovieList(username)),
});

const MainContainer = (props) => {
  useEffect(() => {
    console.log('inside useEffect, here are props', props)
    //no need to hard code argument once username has been saved in state
    //from authentication page (to be implemented)
    return props.loadMovies('David');
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

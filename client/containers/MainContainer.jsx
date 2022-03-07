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
    return props.loadMovies('David');
  }, []);

  return (
    //HeadContainer component goes here
    <div id="main-container">
      <BodyContainer />
    </div>
    //FooterContainer component goes here
  );
};

export default connect(null, mapDispatchToProps)(MainContainer);

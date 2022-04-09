import React from 'react';
import { connect } from 'react-redux';
import CardContainer from './CardContainer.jsx';

const mapStateToProps = (state) => ({
  movieList: state.lists.userMovieArray,
});

const BodyContainer = (props) => {
  console.log('rendering body container', props.movieList);
  return (
    <div className="body-container">
      <input className="search-bar" placeholder="Search..." autoFocus></input>

      <h1>Watchlist</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.toWatch === true)}
      />
      <h1>Favorites</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.fav === true)}
      />
      <h1>Recently Watched</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.haveSeen === true)}
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(BodyContainer);

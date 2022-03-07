import React from 'react';
import { connect } from 'react-redux';
import CardContainer from './CardContainer.jsx';

const mapStateToProps = state => ({
  movieList: state.lists.userMovieArray,
});

const BodyContainer = () => {
  return(
   <div> 
     <h1>movie-fads</h1>
     <h2>watchlist</h2>
     <CardContainer movieList={props.movieList.filter(movie => movie.toWatch === true)} />
     <h2>favorites</h2>
     <CardContainer movieList={props.movieList.filter(movie => movie.fav === true)} />
     <h2>recently watched</h2>
     <CardContainer movieList={props.movieList.filter(movie => movie.haveSeen === true)}/>
   </div>
  );
};

export default connect(mapStateToProps, null) (BodyContainer);
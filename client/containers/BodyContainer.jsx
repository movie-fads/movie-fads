import React from 'react';
import CardContainer from './CardContainer.jsx';

const BodyContainer = () => {

   const mapStateToProps = (state) => {
    const  userMovieArray  = state;
    return { movieList : userMovieArray}
   }
 
  console.log(mapStateToProps.movieList);

  return(
   <div> 
     <h1>movie-fads</h1>
     <h2>watchlist</h2>
     <CardContainer movieList={[578, 24, 218, 106646, 11886]} />
     <h2>favorites</h2>
     <CardContainer movieList={[578, 22, 217, 106640, 11886]} />
     <h2>recently watched</h2>
     <CardContainer movieList={[573, 24, 218, 10663, 11880]}/>
   </div>
  );
};

export default BodyContainer;
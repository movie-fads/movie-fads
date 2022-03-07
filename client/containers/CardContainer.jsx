import React from 'react';
import MediaCard from '../components/MediaCard.jsx';

// const mapStateToProps = state ({
//     movieList = state.user.movieList;
// })
//[578, 24, 218, 106646, 11886]
const CardContainer = (props) => { 
 const movies = [];
 for(let i = 0; i < props.movieList.length; i++){
   movies.push(<MediaCard key={`movieList${i}`} tmdbId={movieList[i]}/>)
 }

  return(
    <div className='cardContainer'>
      {movies}
    </div>
  );
}

export default CardContainer;
import React from 'react';
import Poster from './Poster.jsx';
import Buttons from './Buttons.jsx';


const MediaCard = (props) => {
  function greetUser() {
    console.log("Hi there, user!");
  }
  return(
   <div className='mediaCard' >
    <div className='poster' onClick={() => window.open(`https://www.themoviedb.org/movie/${props.tmdbId}`)} className='mediaCard'>
      <Poster key = {`poster ${props.key}`} tmdbId={props.tmdbId}/>
    </div >
    <div className='buttons'>
      <Buttons />
    </div>
   </div>
  );
}

export default MediaCard;
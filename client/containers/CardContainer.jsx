import React from 'react';
import MediaCard from '../components/MediaCard.jsx';

const CardContainer = (props) => {
  const movies = [];
  for (let i = 0; i < props.movieList.length; i++) {
    movies.push(
      <MediaCard key={`movieList${i}`} tmdbId={props.movieList[i].TMDBid} currRow={props.currRow}/>
    );
  }
  return <div className="card-container">{movies}</div>;
};

export default CardContainer;

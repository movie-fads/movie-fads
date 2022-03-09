import React, { useState } from 'react';
import { connect } from "react-redux";
import CardContainer from "./CardContainer.jsx";
import MediaCard from '../components/MediaCard.jsx';

const mapStateToProps = (state) => ({
  movieList: state.lists.userMovieArray,
});

const BodyContainer = (props) => {
  const [movie, setMovie] = useState('');

  const handleKeyUp = (e) => {
    //event.charCode === 13 handle's clicking enter in search bar
    if (e.keyCode == 13) {
      // console.log("enter was clicked");
      // console.log(`what was typed in search: ${e.target.value}`);
      const movieTitle = e.target.value;

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=b77e6bcb363054a49df8e588ecd2fdc6&query=${movieTitle}`)
        .then((res) => res.json())
        .then(data => {
          console.log('incoming data', data.results[0])
          setMovie(data.results[0])
        })
        .catch((err) => { console.log('failed fetch') })
    }
  };

  console.log("rendering body container", props.movieList);
  return (
    // * Need an event handler to handle search queries
    <div className="body-container">
      <input
        className="search-bar"
        placeholder="Search..."
        onKeyUp={(e) => handleKeyUp(e)}
        autoFocus
      ></input>

      {movie !== '' ? <MediaCard key={`searchMovie`} tmdbId={movie.id} /> : null}

      <h1>Watchlist</h1>
      <CardContainer
        //movieList is an array of objects that is pulled from the api and placed as a collection in the database in the backend
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

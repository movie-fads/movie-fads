import React, { useState } from "react";
import { connect } from "react-redux";
import CardContainer from "./CardContainer.jsx";
import SearchBarMedia from "../components/SearchBarMedia.jsx";

const mapStateToProps = (state) => ({
  movieList: state.lists.userMovieArray,
});

const BodyContainer = (props) => {
  const [searchBarMovies, setSearchBarMovies] = useState([]);

  console.log("movieList", props.movieList);

  const genreCache = {};
  let max;

  for (let i = 0; i < props.movieList.length; i++) {
    if (props.movieList[i].fav === true) {
      fetch(
        `https://api.themoviedb.org/3/movie/${props.movieList[i].TMDBid}?api_key=b77e6bcb363054a49df8e588ecd2fdc6`
      )
        .then((res) => res.json())
        .then((movieData) => {
          console.log("Hi Im in the movieDATA FETCH!", movieData.genres);
          for (let i = 0; i < movieData.genres.length; i++) {
            if (genreCache.hasOwnProperty(movieData.genres[i].name)) {
              genreCache[movieData.genres[i]]++;
            } else genreCache[movieData.genres[i].name] = 1;
            console.log(genreCache, "genreCache");
          }
          for (const key in genreCache) {
            console.log("here in object iteration");
            if (!max) max = key;
            else if (genreCache[key] > genreCache[max]) {
              max = key;
            }
            console.log(max);
          }
        })
        .then(
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=b77e6bcb363054a49df8e588ecd2fdc6&language=en-US&sort_by=popularity.desc&with_genres=${max}`
          )
            .then((res) => res.json())
            .then((movieData) => {
              movieData.results[0].id;
            })
            .catch((err) => console.log("failed fetch:", err))
        )
        .catch((err) => console.log("failed fetch:", err));
    }
  }

  // "results": [
  //   {
  //       "adult": false,
  //       "backdrop_path": "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
  //       "genre_ids": [
  //           28,
  //           12,
  //           878
  //       ],
  //       "id": 634649,
  //       "original_language": "en",
  //       "original_title": "Spider-Man: No Way Home",
  //       "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
  //       "popularity": 4995.766,
  //       "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  //       "release_date": "2021-12-15",
  //       "title": "Spider-Man: No Way Home",
  //       "video": false,
  //       "vote_average": 8.3,
  //       "vote_count": 9007
  //   }

  const handleKeyUp = (e) => {
    //event.charCode === 13 handle's clicking enter in search bar
    if (e.keyCode == 13) {
      // console.log("enter was clicked");
      // console.log(`what was typed in search: ${e.target.value}`);
      const movieTitle = e.target.value;

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b77e6bcb363054a49df8e588ecd2fdc6&query=${movieTitle}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log('incoming data', data.results[0])
          if (!data.results.length) {
            document.querySelector(".search-bar").value = "";
            alert(`invalid entry`);
          } else setMovies(data.results.slice(0, 3));
        })
        .catch((err) => console.log("failed fetch:", err));
    }
  };

  console.log("rendering body container", props.movieList);
  return (
    // * Need an event handler to handle search queries
    <div className="body-container">
      <h2 className="searchHeader">Search for Movies</h2>
      <input
        className="search-bar"
        placeholder="Search for Movies..."
        onKeyUp={(e) => handleKeyUp(e)}
        autoFocus
      ></input>
      <button
        id="searchDeleteBtn"
        onClick={() => {
          document.querySelector(".search-bar").value = "";
          setSearchBarMovies([]);
        }}
      >
        X
      </button>

      <div className="card-container">
        {searchBarMovies.length !== 0
          ? searchBarMovies.map((movie, i) => (
              <SearchBarMedia key={`searchMovie${i}`} tmdbId={movie.id} />
            ))
          : null}
      </div>

      <h1>Watchlist</h1>
      <CardContainer
        //movieList is an array of objects that is pulled from the api and placed as a collection in the database in the backend
        movieList={props.movieList.filter((movie) => movie.toWatch === true)}
        currRow="toWatch"
      />
      <h1>Favorites</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.fav === true)}
        currRow="fav"
      />
      <h1>Recently Watched</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.haveSeen === true)}
        currRow="haveSeen"
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(BodyContainer);

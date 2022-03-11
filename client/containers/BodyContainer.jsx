import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/styles.css";
import CardContainer from "./CardContainer.jsx";
import SearchBarMedia from "../components/SearchBarMedia.jsx";
import WatchLaterBadge from "../images/logo/watchLater.png";
import FavoriteBadge from "../images/logo/Favorites.png";
import RecomendedBadge from "../images/logo/recomended.png";
import AlreadySeenBadge from "../images/logo/AlreadySeen.png";

const mapStateToProps = (state) => ({
  movieList: state.lists.userMovieArray,
});

const BodyContainer = (props) => {
  const [searchBarMovies, setSearchBarMovies] = useState([]);
  //list return from the api query
  const [recList, setRecList] = useState([]);
  // the arr of components displayed in the recommended section
  const [renderRecommendedList, setRenderRecommendedList] = useState([
    <h2>We got nothing</h2>,
  ]);

  const getRecs = async (genres) => {
    const recListArray = [];
    let max;
    for (const keys in genres) {
      if (!max) max = keys;
      else if (genres[keys] > genres[max]) {
        max = keys;
      }
    }

    const movie = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b77e6bcb363054a49df8e588ecd2fdc6&language=en-US&sort_by=popularity.desc&with_genres=${max}`
    )
      .then((res) => res.json())
      .then((movieData) => {
        return movieData;
      })
      .catch((err) => console.log("failed fetch:", err));
    recListArray.push(movie);
    if (!recListArray.length) console.log("need to favorite more");

    setRecList(recListArray);
  };

  const getFavsGenres = async (favList) => {
    const genreCache = {};
    for (let i = 0; i < favList.length; i++) {
      const movieData = await fetch(
        `https://api.themoviedb.org/3/movie/${favList[i].TMDBid}?api_key=b77e6bcb363054a49df8e588ecd2fdc6`
      )
        .then((res) => res.json())
        .then((movieData) => {
          return movieData;
        });
      for (let i = 0; i < movieData.genres.length; i++) {
        if (genreCache.hasOwnProperty(movieData.genres[i].name)) {
          genreCache[movieData.genres[i].name]++;
        } else {
          genreCache[movieData.genres[i].name] = 1;
        }
      }
    }
    return genreCache;
  };

  useEffect(async () => {
    let genres = await getFavsGenres(
      props.movieList.filter((movie) => movie.fav === true)
    );
    getRecs(genres);
  }, [props.movieList]);

  const clearSearchList = (e) => {
    if (e.target.value === "") {
      document.querySelector(".search-bar").value = "";
      setSearchBarMovies([]);
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b77e6bcb363054a49df8e588ecd2fdc6&query=${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          // if (!data.results.length) {
          //   document.querySelector(".search-bar").value = "";
          // } else setSearchBarMovies(data.results.slice(0, 3));
          if (data.results.length) setSearchBarMovies(data.results.slice(0, 3));
        })
        .catch((err) => console.log("failed fetch:", err));
    }
  };

  useEffect(() => {
    console.log("USE EFFECT for renderRecommend", recList);
    if (recList.length) {
      const limitedRecommendedList = recList[0]?.results.slice(0, 10);
      const newArray = [];

      console.log(
        "this is the limited recommended list",
        limitedRecommendedList
      );

      for (const movie of limitedRecommendedList) {
        newArray.push(
          <SearchBarMedia key={`searchMovie${movie.id}`} tmdbId={movie.id} />
        );
      }

      setRenderRecommendedList(newArray);
    }
  }, [recList]);

  console.log("what is this", renderRecommendedList);

  return (
    // * Need an event handler to handle search queries
    <div className="body-container">
      <div className="searchContainer">
        <h2 className="searchHeader">Search for Movies</h2>
        <input
          className="search-bar"
          placeholder="Search for Movies..."
          onChange={(e) => {
            clearSearchList(e);
          }}
          // onKeyUp={(e) => handleKeyUp(e)}
          autoFocus
        ></input>
        <div className="card-container" style={{ justifyContent: "center" }}>
          {searchBarMovies.length !== 0
            ? searchBarMovies.map((movie, i) => (
                <SearchBarMedia key={`searchMovie${i}`} tmdbId={movie.id} />
              ))
            : null}
        </div>
      </div>

      <div className="containerBadge">
        <div className="section">
          <div className="start">
            <img
              className="recomended icon"
              src={WatchLaterBadge}
              alt="Movie recomendations"
            />
          </div>

          <div className="end"></div>
        </div>
      </div>

      <CardContainer
        //movieList is an array of objects that is pulled from the api and placed as a collection in the database in the backend
        movieList={props.movieList.filter((movie) => movie.toWatch === true)}
        currRow="toWatch"
      />
      <div className="containerBadge">
        <div className="section">
          <div className="start">
            <img
              className="favorites icon"
              src={FavoriteBadge}
              alt="Favorites"
            />
          </div>

          <div className="end"></div>
        </div>
      </div>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.fav === true)}
        currRow="fav"
      />
      <div className="containerBadge">
        <div className="section">
          <div className="start">
            <img
              className="AlreadySeen icon"
              src={AlreadySeenBadge}
              alt="Already Seen"
            />
          </div>

          <div className="end"></div>
        </div>
      </div>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.haveSeen === true)}
        currRow="haveSeen"
      />

      <div className="containerBadge">
        <div className="section">
          <div className="start">
            <img
              className="watchLater icon"
              src={RecomendedBadge}
              alt="Watch Later"
            />
          </div>

          <div className="end"></div>
        </div>
      </div>

      {renderRecommendedList.length ? (
        <div className="card-container" style={{ justifyContent: "start" }}>
          {renderRecommendedList}
        </div>
      ) : null}
    </div>
  );
};

export default connect(mapStateToProps, null)(BodyContainer);

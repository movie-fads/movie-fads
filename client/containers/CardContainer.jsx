import React from "react";
import MediaCard from "../components/MediaCard.jsx";

const CardContainer = (props) => {
  const movies = [];
  for (let i = 0; i < props.movieList.length; i++) {
    movies.push(
      <MediaCard
        key={`movieList${i}`}
        tmdbId={props.movieList[i].TMDBid}
        currRow={props.currRow}
      />
    );
  }

  const styleObj =
    movies.length > 6
      ? { justifyContent: "start" }
      : { justifyContent: "center" };

  return (
    <div className="card-container" style={styleObj}>
      {movies}
    </div>
  );
};

export default CardContainer;

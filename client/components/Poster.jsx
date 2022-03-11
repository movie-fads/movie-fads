import React, { useEffect, useState } from "react";
import * as privateVars from "../constants/private.js";

const Poster = (props) => {
  let [BaseImageURL, setBaseImageURL] = useState("");
  let [PosterPath, setPosterPath] = useState("");
  let [OriginalTitle, setOriginalTitle] = useState(null);
  let [BaseURL] = useState("https://api.themoviedb.org/3/");
  const PosterSize = "w200";

  //! Will want to move this function into an action and mapDispatchToProps
  //! Instead of define within useEffect itself
  useEffect(() => {
    let configUrl = "".concat(
      BaseURL,
      "configuration?api_key=",
      privateVars.apiKey
    );

    console.log("configUrl:", configUrl);

    // Get BaseImgUrl
    fetch(configUrl)
      .then((result) => result.json())
      .then((data) => {
        setBaseImageURL(data.images.secure_base_url);
      })
      .catch((err) => console.log("failed config fetch"));

    let url = "".concat(
      BaseURL,
      "movie/",
      props.tmdbId,
      "?api_key=",
      privateVars.apiKey,
      "&langauge=en-US"
    );

    // Get PosterPath
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        console.log("poster path:", data.poster_path);
        setPosterPath(data.poster_path);
        setOriginalTitle(data.original_title);
        // console.log(data);
      })
      .catch((err) => {
        console.log("Err getting poster path:", err);
      });
  }, [props.tmdbId]);
  //

  let newUrl;
  let styleObj;

  if (PosterPath) {
    newUrl = BaseImageURL + PosterSize + PosterPath;
    styleObj = {};
  } else {
    newUrl =
      "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
    styleObj = { width: "200px", height: "300px" };
  }

  return (
    <div className="pic-title">
      <img
        onClick={() =>
          window.open(`https://www.themoviedb.org/movie/${props.tmdbId}`)
        }
        className="movie-pic"
        style={styleObj}
        src={newUrl}
        alt={OriginalTitle}
      />
      <h3>{OriginalTitle}</h3>
    </div>
  );
};

export default Poster;

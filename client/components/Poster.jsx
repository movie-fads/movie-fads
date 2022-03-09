import React, { useEffect, useState } from "react";
import * as privateVars from "../constants/private.js";

const Poster = (props) => {
  let [BaseImageURL, setBaseImageURL] = useState("");
  let [PosterPath, setPosterPath] = useState("");
  let [OriginalTitle, setOriginalTitle] = useState(null);
  let [BaseURL] = useState("https://api.themoviedb.org/3/");
  const PosterSize = "w92";


  //! Will want to move this function into an action and mapDispatchToProps
  //! Instead of define within useEffect itself
  useEffect(() => {
    let configUrl = "".concat(
      BaseURL,
      "configuration?api_key=",
      privateVars.apiKey
    );

    console.log('configUrl:', configUrl);

    // Get BaseImgUrl
    fetch(configUrl)
      .then((result) => result.json())
      .then((data) => {
        console.log(data, 'fetch from configURl')
        setBaseImageURL(data.images.secure_base_url);
      }).catch(err => console.log('failed config fetch'))

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
        console.log('this is inside PosterPath:', data);
        setPosterPath(data.poster_path);
        setOriginalTitle(data.original_title);
        // console.log(data);
      })
      .catch((err) => { console.log('Err getting poster path:', err) });

  }, [props.tmdbId]);

  return (
    <div className="pic-title">
      <img
        className="movie-pic"
        src={BaseImageURL + PosterSize + PosterPath}
        alt={OriginalTitle}
      />
      <h3>{OriginalTitle}</h3>
    </div>
  );
};
export default Poster;

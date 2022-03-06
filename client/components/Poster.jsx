import React, { useEffect, useState } from 'react';
import * as privateVars from '../constants/private.js'

const Poster = props =>  {
  let [BaseImageURL, setBaseImageURL] = useState('');
  let [PosterPath, setPosterPath] = useState('');
  let [OriginalTitle, setOriginalTitle] = useState(null);
  let [setConfigData] = useState('');
  let [BaseURL] = useState('https://api.themoviedb.org/3/');
  let [PosterSize] = useState('w154');
  
useEffect(() => {
  let configUrl = ''.concat(BaseURL, 'configuration?api_key=', privateVars.apiKey);
  fetch(configUrl)
  .then(result => result.json())
  .then(data =>{
    setBaseImageURL(data.images.secure_base_url);
    setConfigData(data.images);
  });
  
  let url = ''.concat(BaseURL, 'movie/', props.tmdbId, '?api_key=', privateVars.apiKey,'&langauge=en-US');
  fetch(url)
    .then(result => result.json())
    .then (data => {
      setPosterPath(data.poster_path)
      setOriginalTitle(data.original_title)
      console.log(data);
    });
  },[]);
  
return (
  <div>
    <h2>Poster Component</h2>
    <img src={BaseImageURL + PosterSize + PosterPath} alt={"jaws"} />
    <h3>{OriginalTitle}</h3>

  </div>    
);
}
export default Poster;
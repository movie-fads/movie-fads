import React, { useEffect, useState } from 'react';
import * as privateVars from '../constants/private.js'

const Poster = props =>  {
  let [BaseImageURL, setBaseImageURL] = useState('');
  let [PosterPath, setPosterPath] = useState('');
  let [setConfigData] = useState('');
  let [BaseURL] = useState('https://api.themoviedb.org/3/');
  let [PosterSize] = useState('w92');
  
useEffect(() => {
  let configUrl = ''.concat(BaseURL, 'configuration?api_key=', privateVars.apiKey);
  fetch(configUrl)
  .then(result => result.json())
  .then(data =>{
    setBaseImageURL(data.images.secure_base_url);
    setConfigData(data.images);
  });
  
  let url = ''.concat(BaseURL,'search/movie?api_key=', privateVars.apiKey, '&query=', 'jaws');
  fetch(url)
    .then(result => result.json())
    .then (data => setPosterPath(data.results[0].poster_path));
  },[]);

return (
  <div>
    <h2>Poster Component</h2>
    <img src={BaseImageURL + PosterSize + PosterPath} alt={"jaws"} />
  </div>    
);
}
export default Poster;
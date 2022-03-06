import React, { useEffect, useState } from 'react';
import * as privateVars from '../constants/private.js'
const Poster = props =>  {
  let [BaseURL, setBaseURl] = useState('https://api.themoviedb.org/3/');
  let [ConfigData, setConfigData] = useState(null);
  let [BaseImageURL, setBaseImageURL] = useState(null);
  let [ImageURL, setImageURL] = useState('');
  let [PosterSize, setPosterSize] = useState('w92');
  let [PosterPath, setPosterPath] = useState('');
  
useEffect(() => {
    let configUrl = ''.concat(BaseURL, 'configuration?api_key=', privateVars.apiKey);
    console.log('configURL', configUrl)
    fetch(configUrl)
    .then(result => {
      console.log('Result 1', result)
      return result.json();
    })
    .then(data =>{
      console.log('Data 1', data);
      setBaseImageURL(data.images.secure_base_url);
      setImageURL(''.concat(BaseImageURL,PosterSize));
      console.log('ImageURL999', ImageURL)
      setConfigData(data.images);
      console.log('Here');
    });
    let url = ''.concat(BaseURL,'search/movie?api_key=', privateVars.apiKey, '&query=', 'jaws');
    fetch(url)
    .then(result => result.json())
    .then (data => {
      console.log('dta9999', data)
      setPosterPath(data.results[0].poster_path);
      setImageURL(ImageURL  + PosterPath);
    });
  },[]);
  console.log('imageURL1', ImageURL)

    return (
     <div>
       <h2>Poster Component</h2>
       <img src={BaseImageURL + PosterSize + PosterPath} alt={"jaws"} />
     </div>    
    );
}
export default Poster;
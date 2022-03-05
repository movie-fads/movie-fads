import React from 'react'
import * as privateVars from '../constants/private.js'
const Poster = props => {
  
    let baseURL = 'https://api.themoviedb.org/3/';
    let configData = null;
    let baseImageURL = null;
    let imageURL = 'hello';
    console.log('first image url', imageURL)
    let posterSize = 'w92';

    let getConfig = function(keyword = 'jaws'){
      let url = ''.concat(baseURL, 'configuration?api_key=', privateVars.apiKey);
      fetch(url)
      .then((result) => {
          console.log('first fetch result', result)
          return result.json();
       })
       .then((data)=>{
         baseImageURL = data.images.secure_base_url;
         imageURL += baseImageURL + posterSize;
         configData = data.images;
         return runSearch(keyword)
       })
       .catch(function(err){console.log(err)});
    }
    
    // console.log(getConfig());
    
    let runSearch = function(keyword){
      let url=''.concat(baseURL,'search/movie?api_key=', privateVars.apiKey, '&query=', keyword);
      fetch(url)
        .then(result => result.json())
        .then((data) => {
           console.log(data);
           const posterPath = data.results[0].poster_path;
           return imageURL += posterPath;      
        })
    }

    getConfig()
    console.log('last image URL', imageURL)
    return (
     <div>
       <h2>Poster Component</h2>
       <img src={imageURL} alt={"jaws"} />
     </div>    
    );
}
export default Poster
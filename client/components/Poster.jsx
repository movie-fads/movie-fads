import React from 'react'
import * as privateVars from '../constants/private.js'
const Poster = props => {
  
    let baseURL = 'https://api.themovieb.org/3/';
    let configData = null;
    let baseImageURL = null;

    let getConfig = function(keyword = 'jaws'){
     let url = ''.concat(baseURL, 'configuration?api_keys', privateVars.apiKey);
     fetch(url)
       .then((result) => {
          return result.json();
       })
       .then((data)=>{
         baseImageURL = data.images.secure_base_URL;
         configData = data.images;
         runSearch(keyword)
       })
       .catch(function(err){alert(err)});
    }

    let runSearch = function(keyword){
      let url=''.concat(baseURL,'search/movie?api_keys=', APIKEY, '&query=', keyword);
      fetch(url)
        .then(result => result.json())
        .then((data) => {
           // document.getElementById('output').innerHTML = JSON.stringify(data,null,4);
        })
    }

    getConfig()

    return (
     <div>
       <img src={movieObj.poster_path} alt={} />
       <h2>{}</h2>
     </div>    
    );
}
export default Poster
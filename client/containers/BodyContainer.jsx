import React from 'react';
import CardContainer from './CardContainer.jsx';

const BodyContainer = () => {
  return(
   <div> 
     <h1>movie-fads</h1>
     <h2>watchlist</h2>
     <CardContainer />
     <h2>favorites</h2>
     <CardContainer />
     <h2>recently watched</h2>
     <CardContainer />
   </div>
  );
};

export default BodyContainer;
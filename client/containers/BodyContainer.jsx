import React from 'react';
import CardContainer from './CardContainer.jsx';

const BodyContainer = () => {
  return(
   <div> 
     <h1>movie-fads</h1>
     <h2>watchlist</h2>
     <CardContainer movieList={[578, 24, 218, 106646, 11886]} />
     <h2>favorites</h2>
     <CardContainer movieList={[578, 24, 218, 106646, 11886]} />
     <h2>recently watched</h2>
     <CardContainer movieList={[578, 24, 218, 106646, 11886]}/>
   </div>
  );
};

export default BodyContainer;
import React from 'react';
//! Buttons need on click functions
//! Functions will dispatch actoins, through mapDispatchToProps
const Buttons = (props) => {
  const buttons = [];
  if (props.button1)
    buttons.push(
      <button type="button" onClick={console.log('')}>
        {props.button1}
      </button>
    );
  if (props.button2)
    buttons.push(
      <button type="button" onClick={console.log('')}>
        {' '}
        {props.button2}
      </button>
    );
  if (props.button3)
    buttons.push(
      <button type="button" onClick={console.log('')}>
        {' '}
        {props.button3}
      </button>
    );

  return <div className="buttons">{buttons}</div>;
};

Buttons.defaultProps = {
  button1: 'Add to Watchlist',
  button2: 'Add to Favorites',
  button3: 'Mark as Watched',
};

export default Buttons;

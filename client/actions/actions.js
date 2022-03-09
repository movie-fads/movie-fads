import * as types from '../constants/actionTypes.js';

export const fetchUserMovieList = (username) => {
  return (dispatch) => {
    console.log('at fetch movie action');
    dispatch(fetchUserMovieListStarted());
    console.log('dispatched fetch start action');
    fetch(`/${username}`)
      .then((res) => {
        console.log('fetch data: ', res);
        return res.json();
      })
      .then((data) => {
        console.log('check this', data)
        dispatch(fetchUserMovieListSuccess(data))
      })
      .catch((err) => { console.log('Im in the error') 
      dispatch(fetchUserMovieListFailure(err))
    });
  };
};

const fetchUserMovieListStarted = () => ({
  type: types.FETCH_USER_MOVIE_LIST,
});
const fetchUserMovieListSuccess = (userObj) => ({
  type: types.FETCH_USER_MOVIE_LIST_SUCCESS,
  payload: userObj,
});
const fetchUserMovieListFailure = (error) => ({
  type: types.FETCH_USER_MOVIE_LIST_FAILURE,
  payload: error,
});

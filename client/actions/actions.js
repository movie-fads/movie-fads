import * as types from '../constants/actionTypes.js';

export const fetchUserMovieList = username => {
    return dispatch => {
        dispatch(fetchUserMovieListStarted());
        fetch(`http://localhost:3000/${username}`)
        .then(res => dispatch(fetchUserMovieListSuccess(res)))
        .catch(err => dispatch(fetchUserMovieListFailure(err)));
    };
};

const fetchUserMovieListStarted = () =>{
    type: types.FETCH_USER_MOVIE_LIST;
}
const fetchUserMovieListSuccess = userObj => {
    type: types.FETCH_USER_MOVIE_LIST_SUCCESS;
    payload: userObj;
}
const fetchUserMovieListFailure = error => {
    type: types.FETCH_USER_MOVIE_LIST_FAILURE;
    payload: {error}
}
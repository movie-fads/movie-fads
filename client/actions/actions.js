import * as types from '../constants/actionTypes.js';

export const fetchUserMovieList = (username) => {
    return dispatch => {
      console.log('at fetch movie action');
        dispatch(fetchUserMovieListStarted());
        console.log('dispatched fetch start action')
        fetch(`http://localhost:3000/${username}`)
          .then(data => {
            console.log('fetch data: ', data)
            return data.json()
          })
          .then(res => dispatch(fetchUserMovieListSuccess(res)))
          .catch(err => dispatch(fetchUserMovieListFailure(err)));
    }
};

// export const fetchUserMovieList = (dispatch) => {
//   console.log('at fetch movie action');
//   fetch('http://localhost:3000/David', {
//     method: 'GET',
//   })
//     .then((res) => res.json())
//     .then((userObj) => {
//       console.log(userObj);
//       dispatch({
//         type: types.FETCH_USER_MOVIE_LIST_SUCCESS,
//         payload: userObj,
//       });
//     })
//     .catch((error) => console.log(error));
// };

const fetchUserMovieListStarted = () => ({
  type: types.FETCH_USER_MOVIE_LIST,
});
const fetchUserMovieListSuccess = (userObj) => ({
  type: types.FETCH_USER_MOVIE_LIST_SUCCESS,
  payload: userObj,
});
const fetchUserMovieListFailure = (error) => ({
  type: types.FETCH_USER_MOVIE_LIST_FAILURE,
  payload: error
});

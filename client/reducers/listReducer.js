import * as types from '../constants/actionTypes.js';

//accessible in mapStateToProps by using state.lists.
const initialState = {
    currentUserID: null,
    userInViewID: null,
    isBrowsing: false,
    userMovieArray: [
        {TMDBid: 578, fav: true, toWatch: false, haveSeen: true},
        {TMDBid: 24, fav: false, toWatch: true, haveSeen: false},
        {TMDBid: 218, fav: false, toWatch: false, haveSeen: true},
    ],
    userFriendsList: [],
};

const listReducer = (state = initialState, action) => {
    console.log('at list reducer');
    switch(action.type) {
        case types.FETCH_USER_MOVIE_LIST_SUCCESS: {
            console.log('at fetch user movie list success switch case');
            const userMovieArray = action.payload.arrMediaObj;
            return {
                ...state,
                userMovieArray,
            };
        };
        default: {
            console.log('returning default state')
            console.log(state)
            return state;
          }
    };
};
export default listReducer;
import * as types from "../constants/actionTypes.js";

const initialState = {
  currentUserID: null,
  userInViewID: null,
  isBrowsing: false,
  userMovieArray: [],
  userFriendsList: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_MOVIE_LIST_SUCCESS: {
      const userMovieArray = action.payload.arrMediaObj;
      return {
        ...state,
        userMovieArray,
      };
    }
    default: {
      return state;
    }
  }
};
export default listReducer;

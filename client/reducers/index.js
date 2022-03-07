import { combineReducers } from 'redux';
import listReducer from './listReducer.js';
const reducers = combineReducers({
 lists: listReducer,
})
export default reducers;

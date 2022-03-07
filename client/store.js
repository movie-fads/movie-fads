import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index.js';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);
export default store;
// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import deck from './deck';

const rootReducer = combineReducers({
  counter,
  deck,
  routing
});

export default rootReducer;

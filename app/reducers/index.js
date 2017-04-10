// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import deck from './deck';
import auth from './auth';

const rootReducer = combineReducers({
  counter,
  deck,
  routing,
  auth
});

export default rootReducer;

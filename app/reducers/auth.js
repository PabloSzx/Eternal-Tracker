import { SET_AUTH_STATE, LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  loginError: '',
  user: '86j3uFda1hhMcgsK9cDDG0JQsg62'
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH_STATE:
      return { ...state, authenticated: action.payload };
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    case CLEAR_LOGIN_ERROR:
      return { ...state, loginError: '' };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

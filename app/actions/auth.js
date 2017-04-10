// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';
// export const SET_AUTH_STATE = 'SET_AUTH_STATE';
// export const SET_NEXT = 'SET_NEXT';
// export const RESET_NEXT = 'RESET_NEXT';
import Firebase from 'firebase';
import { SET_AUTH_STATE, LOGIN_ERROR, CLEAR_LOGIN_ERROR, LOGIN_SUCCESS } from './types';

export function setAuthState(bool) {
  return {
    type: SET_AUTH_STATE,
    payload: bool
  };
}

export function login(username, password) {
  return dispatch => {
    Firebase.auth().signInWithEmailAndPassword(username.concat('@pablosz.me'), password).then(() => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: Firebase.auth().currentUser.uid
      });
      return 'asd';
    }).catch((err) => {
      if (err.code === 'auth/user-not-found') {
        Firebase.auth().createUserWithEmailAndPassword(username.concat('@pablosz.me'), password).catch((error) => {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.message
          });
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: err.message
        });
      }
    });
  };
}

export function register(username, password) {
  return dispatch => {
    Firebase.auth().createUserWithEmailAndPassword(username.concat('@pablosz.me'), password).catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message
      });
    });
  };
}

export function clearLoginError() {
  return {
    type: CLEAR_LOGIN_ERROR
  };
}

export function logout() {
  return dispatch => {
    Firebase.auth().signOut().then(() => {
      dispatch({
        type: SET_AUTH_STATE,
        payload: false
      });
      return 'asd';
    }).catch((error) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message
      });
    });
  };
}

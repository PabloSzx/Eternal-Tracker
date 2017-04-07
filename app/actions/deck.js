import { ADD_DECK, EDIT_DECK, UPDATE_ACTUAL_DECK } from './types';

const firebase = require('firebase');

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    payload: deck
  };
}

export function snapshotFirebase() {
  return dispatch => {
    firebase.database().ref().on('value', (snapshot) => {
      const clean = snapshot.val().cleanDeck;
      const full = snapshot.val().fullDeck;
      dispatch({
        type: UPDATE_ACTUAL_DECK,
        payload: clean,
        fullPayload: full
      });
    });
  };
}

export function editDeck(deck) {
  return {
    type: EDIT_DECK,
    payload: deck
  };
}

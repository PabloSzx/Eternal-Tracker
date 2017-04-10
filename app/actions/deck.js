import _ from 'lodash';
import Cards from '../utils/cards.json';
import { ADD_DECK, EDIT_DECK, UPDATE_ACTUAL_DECK, SET_TOTAL_CARDS, SET_COUNTING } from './types';

const firebase = require('firebase');


export function addDeck(deck) {
  return {
    type: ADD_DECK,
    payload: deck
  };
}

export function setTotalCards(n) {
  return {
    type: SET_TOTAL_CARDS,
    payload: n
  };
}

export function setCounting(name, number) {
  return {
    type: SET_COUNTING,
    payload: number,
    name
  };
}

export function snapshotFirebase(user) {
  if (user) {
  return dispatch => {
    firebase.database().ref(user).on('value', (snapshot) => {
      if (snapshot.val()) {
        const clean = snapshot.val().cleanDeck;
        const full = snapshot.val().fullDeck;

        let number;
        const counting = {};
        const uniqueCards = [];
        _.map(Cards, (value) => {
          return _.map(value, (v) => {
            return _.map(v, (nombre) => {
              if ((_.find(clean, (n) => (nombre.replace('.png', '') === n))) && !(_.find(uniqueCards, (m) => nombre.replace('.png', '') === m))) {
                uniqueCards[uniqueCards.length] = nombre.replace('.png', '');
                if ((_.find(clean, (n) => (nombre.replace('.png', '') === n)))) {
                  _.map(full, (val) => {
                    const cleanName = val.substring(val.indexOf(' '), val.indexOf('(Set')).trim();
                    if (cleanName === nombre.replace('.png', '')) {
                      if (!counting[cleanName]) {
                        number = parseInt(val.substring(0, val.indexOf(' ')), 10);
                        counting[cleanName] = number;
                        // this.props.setCounting(cleanName, number);
                        // this.state.counting[cleanName] = number;
                      }
                      // console.log('xd');
                      // console.log(this.props.totalCards);
                    }
                  });
                }
              }
            });
          });
        });
        let totalCards = 0;
        _.map(counting, (value) => {
          totalCards += value;
        });
        dispatch({
          type: UPDATE_ACTUAL_DECK,
          payload: clean,
          fullPayload: full,
          countingPayload: counting,
          totalCardsPayload: totalCards
        });
      } else {
        firebase.database().ref(user).update({
          cleanDeck: ['Initiate Of The Sands'],
          fullDeck: ['1 Initiate Of The Sands']
        });
      }
    });
  };
  }
}

export function editDeck(deck) {
  return {
    type: EDIT_DECK,
    payload: deck
  };
}

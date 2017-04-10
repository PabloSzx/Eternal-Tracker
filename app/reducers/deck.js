import { ADD_DECK, EDIT_DECK, UPDATE_ACTUAL_DECK, SET_TOTAL_CARDS, SET_COUNTING } from '../actions/types';

const INITIAL_STATE = {
  deck: [], fullDeck: [], totalCards: 0, counting: {}
};

export default function deck(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, deck: action.payload };
    case EDIT_DECK:
      return { ...state, deck: action.payload };
    case UPDATE_ACTUAL_DECK:
      return { ...state,
        deck: action.payload,
        fullDeck: action.fullPayload,
        counting: action.countingPayload,
        totalCards: action.totalCardsPayload
      };
    case SET_TOTAL_CARDS:
      return { ...state, totalCards: action.payload };
    case SET_COUNTING:
      return { ...state, counting: { ...state.counting, [action.name]: action.payload } };
    default:
      return state;
  }
}

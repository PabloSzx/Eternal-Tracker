import { ADD_DECK, EDIT_DECK, UPDATE_ACTUAL_DECK } from '../actions/types';

export default function deck(state = { deck: [], fullDeck: [] }, action) {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, deck: action.payload };
    case EDIT_DECK:
      return { ...state, deck: action.payload };
    case UPDATE_ACTUAL_DECK:
      return { ...state, deck: action.payload, fullDeck: action.fullPayload };
    default:
      return state;
  }
}

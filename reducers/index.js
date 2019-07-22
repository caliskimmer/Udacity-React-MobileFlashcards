import { combineReducers } from 'redux';

// Dev imported
import { ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions';

function decks(state={}, action) {
    switch(action.type) {
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            };
        case DELETE_DECK:
            const {[action.deck.title]: _, ...rest} = state;
            return {
                ...rest
            };
        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    cards: action.deck.cards.concat(action.card)
                }
            };
        default:
            return state
    }
}

export default combineReducers({
   decks
});
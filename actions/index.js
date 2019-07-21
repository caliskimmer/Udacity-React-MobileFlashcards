export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}

export function deleteDeck(deck) {
    return {
        type: DELETE_DECK,
        deck
    };
}

export function addCard(card, deck) {
    return {
        type: ADD_CARD,
        card,
        deck
    }
}
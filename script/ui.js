
import { getCards } from './api.js';


const state = {
    cards: []
};

getCards()

    .then(data => {

        state.cards = data;
        // console.log(state.cards);
        const todoCards = state.cards.filter(card => card.status === 'todo');
        const doingCards = state.cards.filter(card => card.status === 'doing');
        const doneCards = state.cards.filter(card => card.status === 'done');

        console.log('Todo:', todoCards);
        console.log('Doing:', doingCards);
        console.log('Done:', doneCards);
    })

    .catch(error => {
        console.log('Erreur:', error);
    });

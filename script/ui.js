
import { getCards } from './api.js';


const state = {
    cards:[]
};

getCards()

    .then(data => {

        state.cards  = data ;
        console.log(state.cards);
    })

    .catch(error => {
        console.log('Erreur:', error);
    });

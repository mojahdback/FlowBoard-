
import { getCards } from './api.js';

getCards()

    .then(data => {
        console.log(data);
    })

    .catch(error => {
        console.log('Erreur:', error);
    });

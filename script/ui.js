
import { getCards } from './api.js';


const state = {
    cards: []
};

const counTodo = document.getElementById('count-todo');
const counDoing = document.getElementById('count-doing');
const counDone = document.getElementById('count-done');

const colunTodo = document.getElementById('col-todo');
const colunDoing = document.getElementById('col-doing');
const colunDone = document.getElementById('col-done');



getCards()

    .then(data => {
        state.cards = data;
        createCart();


    })

    .catch(error => {
        console.log('Erreur:', error);
    });


function creatEl(tag, class_Name, text) {
    const el = document.createElement(tag);
    el.className = class_Name;
    el.textContent = text;
    return el;

}


function createCart() {

    const todoCards = state.cards.filter(card => card.status === 'todo');
    const doingCards = state.cards.filter(card => card.status === 'in-progress');
    const doneCards = state.cards.filter(card => card.status === 'done');

    counTodo.textContent = todoCards.length;
    counDoing.textContent = doingCards.length;
    counDone.textContent = doneCards.length;


    todoCards.forEach(card => {
        const cart = document.createElement('div');
        cart.className = 'card'
        const title = creatEl('p', 'title-class', card.title);
        const assignee = creatEl('p', 'assignee-class', card.assignee);
        const dueDate = creatEl('p', 'dueDate-class', card.dueDate);
        const priority = creatEl('span', 'priority-class', card.priority);
        const status = creatEl('span', 'status-class', card.status);
        cart.append(title ,assignee , dueDate ,priority  , status) ;
        colunTodo.appendChild(cart);


    });

    doingCards.forEach(card => {
        const cart = document.createElement('div');
        cart.className = 'card';
        const title = creatEl('p', 'title-class', card.title);
        const assignee = creatEl('p', 'assignee-class', card.assignee);
        const dueDate = creatEl('p', 'dueDate-class', card.dueDate);
        const priority = creatEl('span', 'priority-class', card.priority);
        const status = creatEl('span', 'status-class', card.status);
        cart.append(title ,assignee , dueDate ,priority  , status) ;
        colunDoing.appendChild(cart);
       
    });

    doneCards.forEach(card => {
        const cart = document.createElement('div');
        cart.className = 'card';
        const title = creatEl('p', 'title-class', card.title);
        const assignee = creatEl('p', 'assignee-class', card.assignee);
        const dueDate = creatEl('p', 'dueDate-class', card.dueDate);
        const priority = creatEl('span', 'priority-class', card.priority);
        const status = creatEl('span', 'status-class', card.status);
        cart.append(title ,assignee , dueDate ,priority  , status) ;
        colunDone.appendChild(cart);
     
    });


}



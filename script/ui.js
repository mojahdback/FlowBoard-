
import { getCards } from './api.js';


const state = {
    cards: [],
    loading: false,
    error: null
};

const counTodo = document.getElementById('count-todo');
const counDoing = document.getElementById('count-doing');
const counDone = document.getElementById('count-done');

const colunTodo = document.getElementById('col-todo');
const colunDoing = document.getElementById('col-doing');
const colunDone = document.getElementById('col-done');


function loadCards() {


    state.loading = true;
    state.error = null;

    getCards()

        .then(data => {
            state.cards = data;

        })

        .catch(error => {
            state.error = error.message;
        })

        .finally(() => {
            state.loading = false;
            renderState();

        })



}

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const retryBtn = document.getElementById('retry');
const board = document.getElementById('board');


function renderState() {

    if (state.loading) {

        loadingEl.hidden = false;
        errorEl.hidden = true;
        retryBtn.hidden = true;
        board.hidden = true;

        return;
    }

    if (state.error) {
        loadingEl.hidden = true;
        errorEl.hidden = false;
        retryBtn.hidden = false;
        board.hidden = true;
        errorEl.textContent = state.error;
        return;

    }

    loadingEl.hidden = true;
    errorEl.hidden = true;
    retryBtn.hidden = true;
    board.hidden = false;

    createCart();

}

retryBtn.addEventListener('click', () => {
    loadCards();
})


function creatEl(tag, class_Name, text) {
    const el = document.createElement(tag);
    el.className = class_Name;
    el.textContent = text;
    return el;

}

function createCart() {

    colunTodo.innerHTML = '';
    colunDoing.innerHTML = '';
    colunDone.innerHTML = '';

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
        cart.append(title, assignee, dueDate, priority, status);
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
        cart.append(title, assignee, dueDate, priority, status);
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
        cart.append(title, assignee, dueDate, priority, status);
        colunDone.appendChild(cart);

    });


}


const modal  = document.getElementById('modal');
const newCartBtn = document.getElementById('btn-new-card'); 
const btnCancel = document.getElementById('btn-cancel');

function openModal(){
    modal.classList.remove('hidden');

}

function closeModal(){
     modal.classList.add('hidden');

}

newCartBtn.addEventListener('click' ,openModal );
btnCancel.addEventListener('click' ,closeModal );


loadCards();






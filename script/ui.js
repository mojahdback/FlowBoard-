
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


function loadCards(params = new URLSearchParams()) {

    state.loading = true;
    state.error = null;
    renderState();
    getCards(params)

        .then(data => {
            state.cards = data;
            renderAssignees(data);

            if(data.length  === 0 ){
                statusMessage.textContent = "Aucune carte";
            }
            else{
                statusMessage.textContent = '';
            }

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


const modal = document.getElementById('modal');
const newCartBtn = document.getElementById('btn-new-card');
const btnCancel = document.getElementById('btn-cancel');
const cardForm = document.getElementById('card-form');

function openModal() {
    modal.classList.remove('hidden');

}

function closeModal() {
    modal.classList.add('hidden');

}

newCartBtn.addEventListener('click', openModal);
btnCancel.addEventListener('click', closeModal);

const titleCard = document.getElementById('title');
const descriptCard = document.getElementById('description');
const priorityCard = document.getElementById('priority');
const assigneeCard = document.getElementById('assignee');
const statusCard = document.getElementById('status');
const dateCard = document.getElementById('date');
const btnSaveCart = document.getElementById('save-cart');

function addNewCart() {
    state.cards.push({
        title: titleCard.value,
        description: descriptCard.value,
        status: statusCard.value,
        priority: priorityCard.value,
        assignee: assigneeCard.value,
        dueDate: dateCard.value

    })


}

const errorTitle = document.getElementById('error-title');
const errorDescript = document.getElementById('error-description');
const errorAssignee = document.getElementById('error-assignee');
const errorDate = document.getElementById('error-date');

function validateForm() {
    let virifi = true;
    if (titleCard.value.trim() === '') {
        errorTitle.textContent = "Invalide Title ";
        virifi = false;
    } else {
        errorTitle.textContent = '';
    }

    if (descriptCard.value.trim() !== '' && descriptCard.value.trim().length < 10) {
        errorDescript.textContent =
            "Invalide Description";

        virifi = false;
    } else {
        errorDescript.textContent = "";
    }

    if (assigneeCard.value.trim() === "") {
        errorAssignee.textContent =
            "L'assigné est obligatoire";

        virifi = false;
    } else {
        errorAssignee.textContent = "";
    }

    let today = new Date();

    let slectDate = new Date(dateCard.value);

    if (!(today.getFullYear() < slectDate.getFullYear() ||
        (today.getFullYear() === slectDate.getFullYear() && today.getMonth() < slectDate.getMonth()) ||
        (today.getFullYear() === slectDate.getFullYear() && today.getMonth() === slectDate.getMonth() && today.getDate() < slectDate.getDate()))) {

        errorDate.textContent = "La date doit être superieure a aujourd'hui";
        virifi = false;
    }

    return virifi;
}

btnSaveCart.addEventListener('click', () => {
    if (!validateForm()) {
        return;
    }
    addNewCart();

    renderState();

    closeModal();

    cardForm.reset();

})

// filter 

const filterPriority = document.getElementById('filter-priority');
const filterAssignee = document.getElementById('filter-assignee');
const filterQ = document.getElementById('filter-q');

const btnReset = document.getElementById('btn-reset');
const statusMessage = document.getElementById('status-message');

function getFilters() {

    const params = new URLSearchParams();

    if (filterPriority.value !== '') {

        params.set('priority', filterPriority.value);

    }

    if (filterAssignee.value !== '') {

        params.set('assignee', filterAssignee.value);

    }

    if (filterQ.value.trim() !== '') {

        params.set('q', filterQ.value.trim());

    }

    return params;

}




loadCards();












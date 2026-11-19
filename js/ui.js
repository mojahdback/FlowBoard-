import { getCards, changeStatus } from './api.js';

const counTodo = document.getElementById('count-todo');
const counDoing = document.getElementById('count-doing');
const counDone = document.getElementById('count-done');
const colunTodo = document.getElementById('col-todo');
const colunDoing = document.getElementById('col-doing');
const colunDone = document.getElementById('col-done');

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const board = document.getElementById('board');

const modal = document.getElementById('modal');
const cardForm = document.getElementById('card-form');


const titleCard = document.getElementById('title');
const descriptCard = document.getElementById('description');
const priorityCard = document.getElementById('priority');
const assigneeCard = document.getElementById('assignee');
const statusCard = document.getElementById('status');
const dateCard = document.getElementById('date');


const filterPriority = document.getElementById('filter-priority');
const filterAssignee = document.getElementById('filter-assignee');
const filterQ = document.getElementById('filter-q');
const statusMessage = document.getElementById('status-message');




export const elements = {
    retryBtn: document.getElementById('retry'),
    newCartBtn: document.getElementById('btn-new-card'),
    btnCancel: document.getElementById('btn-cancel'),
    btnSaveCart: document.getElementById('save-cart'),
    btnReset: document.getElementById('btn-reset'),
    btnModifyCart: document.getElementById('modify-cart'),
    filterPriority,
    filterAssignee,
    filterQ
};


export function renderState(state) {

    if (state.loading) {

        loadingEl.hidden = false;
        errorEl.hidden = true;
        elements.retryBtn.hidden = true;
        board.hidden = true;

        return;
    }

    if (state.error) {
        loadingEl.hidden = true;
        errorEl.hidden = false;
        elements.retryBtn.hidden = false;
        board.hidden = true;
        errorEl.textContent = state.error;
        return;

    }

    loadingEl.hidden = true;
    errorEl.hidden = true;
    elements.retryBtn.hidden = true;
    board.hidden = false;

    createCart(state.cards);

}

export function showStatusMessage(text) {
    statusMessage.textContent = text;
}



function creatEl(tag, class_Name, text) {
    const el = document.createElement(tag);
    el.className = class_Name;
    el.textContent = text;
    return el;

}

function createCart(cards) {

    colunTodo.innerHTML = '';
    colunDoing.innerHTML = '';
    colunDone.innerHTML = '';

    const todoCards = cards.filter(card => card.status === 'todo');
    const doingCards = cards.filter(card => card.status === 'in-progress');
    const doneCards = cards.filter(card => card.status === 'done');

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
        const btnModifyCart = creatEl('button', 'btnModify', 'Modify');
        btnModifyCart.setAttribute('data-id', card.id);
        const btns = document.createElement('div');
        btns.className = 'btns';
        const btnRight = creatEl('button', 'btn-right', '-->');
        btns.append(btnRight);
        cart.append(title, assignee, dueDate, priority, status, btnModifyCart, btns);
        colunTodo.appendChild(cart);
        btnModifyCart.addEventListener('click', async (e) => {
            elements.btnSaveCart.classList.add('hidden');
            elements.btnModifyCart.classList.remove('hidden');
            const id = e.currentTarget.dataset.id;
            const card = await getCartToModify(id);
            document.querySelector('[name="idd"]').value = card.data.id;
            document.querySelector('[name="title"]').value = card.data.title;
            document.querySelector('[name="description"]').value = card.data.description;
            document.querySelector('[name="priority"]').value = card.data.priority;
            document.querySelector('[name="assignee"]').value = card.data.assignee;
            document.querySelector('[name="status"]').value = card.data.status;
            document.querySelector('[name="date"]').value = card.data.dueDate;
            openModal();

        })

        btnRight.addEventListener('click', async () => {
            await changeStatus(card.id, 'in-progress');
            card.status = 'in-progress';
            createCart(cards);

        })

    });


    doingCards.forEach(card => {
        const cart = document.createElement('div');
        cart.className = 'card';
        const title = creatEl('p', 'title-class', card.title);
        const assignee = creatEl('p', 'assignee-class', card.assignee);
        const dueDate = creatEl('p', 'dueDate-class', card.dueDate);
        const priority = creatEl('span', 'priority-class', card.priority);
        const status = creatEl('span', 'status-class', card.status);
        const btnModifyCart = creatEl('button', 'btnModify', 'Modify');
        btnModifyCart.setAttribute('data-id', card.id);
        const btns = document.createElement('div');
        btns.className = 'btns';
        const btnRight = creatEl('button', 'btn-right', '-->');
        const btnLeft = creatEl('button', 'btn-left', '<--');
        btns.append(btnLeft, btnRight);
        cart.append(title, assignee, dueDate, priority, status, btnModifyCart, btns);
        colunDoing.appendChild(cart);
        btnModifyCart.addEventListener('click', async (e) => {
            elements.btnSaveCart.classList.add('hidden');
            elements.btnModifyCart.classList.remove('hidden');
            const id = e.currentTarget.dataset.id;
            const card = await getCartToModify(id);
            document.querySelector('[name="idd"]').value = card.data.id;
            document.querySelector('[name="title"]').value = card.data.title;
            document.querySelector('[name="description"]').value = card.data.description;
            document.querySelector('[name="priority"]').value = card.data.priority;
            document.querySelector('[name="assignee"]').value = card.data.assignee;
            document.querySelector('[name="status"]').value = card.data.status;
            document.querySelector('[name="date"]').value = card.data.dueDate;
            openModal();

        })

        btnLeft.addEventListener('click', async () => {

            await changeStatus(card.id, 'todo');
            card.status = 'todo';
            createCart(cards);
        });

        btnRight.addEventListener('click', async () => {

            await changeStatus(card.id, 'done');
            card.status = 'done';
            createCart(cards);

        });

    });

    doneCards.forEach(card => {
        const cart = document.createElement('div');
        cart.className = 'card';
        const title = creatEl('p', 'title-class', card.title);
        const assignee = creatEl('p', 'assignee-class', card.assignee);
        const dueDate = creatEl('p', 'dueDate-class', card.dueDate);
        const priority = creatEl('span', 'priority-class', card.priority);
        const status = creatEl('span', 'status-class', card.status);
        const btnModifyCart = creatEl('button', 'btnModify', 'Modify');
        btnModifyCart.setAttribute('data-id', card.id);
        const btns = document.createElement('div');
        btns.className = 'btns';
        const btnLeft = creatEl('button', 'btn-left', '<--');
        btns.append(btnLeft);
        cart.append(title, assignee, dueDate, priority, status, btnModifyCart, btns);
        colunDone.appendChild(cart);
        btnModifyCart.addEventListener('click', async (e) => {
            elements.btnSaveCart.classList.add('hidden');
            elements.btnModifyCart.classList.remove('hidden');
            const id = e.currentTarget.dataset.id;
            const card = await getCartToModify(id);
            document.querySelector('[name="idd"]').value = card.data.id;
            document.querySelector('[name="title"]').value = card.data.title;
            document.querySelector('[name="description"]').value = card.data.description;
            document.querySelector('[name="priority"]').value = card.data.priority;
            document.querySelector('[name="assignee"]').value = card.data.assignee;
            document.querySelector('[name="status"]').value = card.data.status;
            document.querySelector('[name="date"]').value = card.data.dueDate;
            openModal();

        })

    });


}


export function openModal() {
    modal.classList.remove('hidden');

}

export function closeModal() {
    modal.classList.add('hidden');
}

export function getFormData() {
    return {
        title: titleCard.value,
        description: descriptCard.value,
        status: statusCard.value,
        priority: priorityCard.value,
        assignee: assigneeCard.value,
        dueDate: dateCard.value
    };
}

const errorTitle = document.getElementById('error-title');
const errorDescript = document.getElementById('error-description');
const errorAssignee = document.getElementById('error-assignee');
const errorDate = document.getElementById('error-date');

export function validateForm() {
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
    else {
        errorDate.textContent = '';
    }

    return virifi;
}

export function resetForm() {
    cardForm.reset();
}

// filter 

export function getFilters() {

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


export function renderAssignees(cards) {

    if (filterAssignee.options.length > 1) return;

    const assignees = cards.map(card => card.assignee);
    const uniqueAssignees = [...new Set(assignees)];

    uniqueAssignees.forEach(assignee => {

        const option = document.createElement('option');

        option.value = assignee;

        option.textContent = assignee;

        filterAssignee.append(option);

    });

}

export function resetFilters() {
    filterPriority.value = '';
    filterAssignee.value = '';
    filterQ.value = '';
}

async function getCartToModify(id) {
    return await axios.get('https://flowboard-api-virid.vercel.app/cards/' + id);
}


export async function modifyCart(id, data) {

    const options = {
        method: 'PUT',
        url: 'https://flowboard-api-virid.vercel.app/cards/' + id,
        headers: {
            'X-Workspace': 'public'
        },
        params: {
            password: "1234"
        },
        data: data
    }

    try {
        const { data } = await axios.request(options)

    } catch (error) {
        console.error(error)
    }
}












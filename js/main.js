import { getCards } from './api.js';
import {
    elements,
    renderState,
    renderAssignees,
    showStatusMessage,
    openModal,
    closeModal,
    validateForm,
    getFormData,
    resetForm,
    getFilters,
    resetFilters
} from './ui.js';

const state = {
    cards: [],
    loading: false,
    error: null
};


function loadCards(params = new URLSearchParams()) {

    state.loading = true;
    state.error = null;
    renderState(state);
    getCards(params)

        .then(data => {
            state.cards = data;
            renderAssignees(data);
            showStatusMessage(data.length === 0 ? 'Aucune carte' : '');
        })

        .catch(error => {
            state.error = error.message;
        })

        .finally(() => {
            state.loading = false;
            renderState(state);

        })



}

function addNewCart(){
    state.cards.push(getFormData());
}


elements.retryBtn.addEventListener('click', () => loadCards())
elements.newCartBtn.addEventListener('click', openModal);
elements.btnCancel.addEventListener('click', closeModal);

elements.btnSaveCart.addEventListener('click', () => {
    if (!validateForm()) {
        return;
    }
    addNewCart();

    renderState();

    closeModal();
    resetForm();

})


elements.filterPriority.addEventListener('change', () => {

    loadCards(getFilters());

});

elements.filterAssignee.addEventListener('change', () => {

    loadCards(getFilters());

});

elements.filterQ.addEventListener('input', () => {

    loadCards(getFilters());

});

elements.btnReset.addEventListener('click', () => {
    resetFilters();
    loadCards();

});

loadCards();
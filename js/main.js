import { getCards , deleteCard } from './api.js';
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
    resetFilters,
    modifyCart, 
    openModalDelete,
    closeModalDelete,
    selectedCardId,
    currentCards,
    createCart
    
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

function addNewCart() {
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

    renderState(state);

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


elements.btnModifyCart.addEventListener('click', async () => {
    if(!validateForm()){
        return ;
    }
    let data = {
        id:document.querySelector('[name="idd"]').value,
        title:document.querySelector('[name="title"]').value,
        description: document.querySelector('[name="description"]').value ,
        priority: document.querySelector('[name="priority"]').value ,
        assignee: document.querySelector('[name="assignee"]').value ,
        status: document.querySelector('[name="status"]').value ,
        dueDate: document.querySelector('[name="date"]').value 

    }
    
    await modifyCart(data.id , data)
    closeModal();
    resetForm();
    loadCards(getFilters());

});

elements.btnConfirmCancel.addEventListener('click' ,() => {
    closeModalDelete();
})


elements.btnConfirmDelete.addEventListener('click', async () => {
    elements.confirmError.textContent = '';

    try {
        await deleteCard(selectedCardId);

        const index = currentCards.findIndex(
            card => String(card.id) === String(selectedCardId)
        );

        if (index !== -1) {
            currentCards.splice(index, 1);
        }

        closeModalDelete();
        createCart(currentCards);

        selectedCardId = null;

    } catch (error) {
        console.log(error);
        elements.confirmError.textContent = 'Erreur in delete';
    }
});



loadCards();
import {
    paginationBtnNextEl, paginationBtnBackEl,
    paginationNumberNextEl, paginationNumberBackEl,
    paginationEl, state, numberEl
} from '../Common.js';
import { renderJobItems } from './renderHTML.js';

const renderPagingBtn = () => {
    const lastPage = Math.ceil(state.searchJobItems.length / 7);
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    if (state.currentPage === lastPage) {
        document.querySelector('.pagination__button--next').classList.add('pagination__button--hidden')
    } else {
        document.querySelector('.pagination__button--next').classList.remove('pagination__button--hidden')
    }

    if (state.currentPage > 1) {
        document.querySelector('.pagination__button--back').classList.remove('pagination__button--hidden');
    } else {
        document.querySelector('.pagination__button--back').classList.add('pagination__button--hidden');
    }
};

const pagingHandler = event => {
    const selectedPagingBtn = event.target.closest('.pagination__button');
    if (!selectedPagingBtn) return;
    const nextPageBtn = selectedPagingBtn.className.includes('--next') ? true : false;

    state.currentPage += nextPageBtn ? 1 : -1;

    renderPagingBtn();
    renderJobItems();
};

// for searching and sorting
const resetPagination = () => {
    state.currentPage = 1;
    paginationNumberNextEl.textContent = 2;
    paginationNumberBackEl.textContent = 0;
    paginationBtnBackEl.classList.add('pagination__button--hidden');
};

paginationEl.addEventListener('click', pagingHandler);

export default resetPagination;
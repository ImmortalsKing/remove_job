import {
    paginationBtnNextEl, paginationBtnBackEl,
    paginationNumberNextEl, paginationNumberBackEl,
    paginationEl, state
} from '../Common.js';
import { renderJobItems } from './renderHTML';

const pagingHandler = event => {
    const selectedPagingBtn = event.target.closest('.pagination__button');
    if (!selectedPagingBtn) return;
    const nextPageBtn = selectedPagingBtn.className.includes('--next') ? true : false;
    nextPageBtn ? state.currentPage++ : state.currentPage--;
    renderJobItems();
};

paginationEl.addEventListener('click', pagingHandler);
import {sortingEl, sortingBtnRelevantEl, sortingBtnRecentEl, state} from '../Common.js'
import {renderJobItems} from './renderHTML.js';

const sortingHandle = event => {
    const selectedSortingBtn = event.target.closest('.sorting__button');
    if(!selectedSortingBtn) return;
    const recentBtnEl = selectedSortingBtn.className.includes('--recent')? true : false;
    if(recentBtnEl){
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        })
    } else {
        sortingBtnRelevantEl.classList.add('sorting__button--active');
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        state.searchJobItems.sort((a,b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    };
    renderJobItems();
};

sortingEl.addEventListener('click', sortingHandle);
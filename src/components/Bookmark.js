import { state, bookmarksBtnEl, jobListSearchEl, jobListBookmarksEl, jobDetailsContentEl } from '../Common.js'
import { renderJobItems } from './renderHTML.js';

const jobItemClickHandler = event => {
    const bookmarkBtn = event.target.closest('.job-item__bookmark-icon');
    if (!bookmarkBtn) return;
    bookmarkBtn.classList.toggle('job-item__bookmark-icon--bookmarked');
    const jobItem = event.target.closest('a');
    const isBookmarked = bookmarkBtn.className.includes('job-item__bookmark-icon--bookmarked') ? true : false;
    if (isBookmarked) {
        jobListBookmarksEl.textContent = "";
        const bookmarkedItem = state.searchJobItems.find(job => job.id == jobItem.getAttribute('href'));
        state.bookmarkItems.push(bookmarkedItem);
    } else {
        const bookmarkedIndex = state.bookmarkItems.findIndex(job => job.id == jobItem.getAttribute('href'))
        state.bookmarkItems.splice(bookmarkedIndex, 1);
    };
    renderJobItems('bookmark');
};

const jobDetailClickHandler = event => {
    const bookmarkBtn = event.target.closest('.job-info__bookmark-icon');
    const jobItemId = window.location.hash.substring(1);
    if (!bookmarkBtn) return;
    bookmarkBtn.classList.toggle('job-info__bookmark-icon--bookmarked');
    const isBookmarked = bookmarkBtn.className.includes('job-info__bookmark-icon--bookmarked') ? true : false;
    if (isBookmarked) {
        jobListBookmarksEl.textContent = "";
        state.bookmarkItems.push(state.activeJobItem);
        if (state.searchJobItems) {
            const matchedItem = [...document.querySelectorAll('.job-item__link')].find(item => {
                return item.getAttribute('href') == jobItemId
            });
            console.log(matchedItem.querySelector('.job-item__bookmark-icon').classList);
            
            matchedItem.querySelector('.job-item__bookmark-icon').classList.add('job-item__bookmark-icon--bookmarked');
        };
    } else {
        const bookmarkedIndex = state.bookmarkItems.findIndex(job => job.id == jobItemId)
        state.bookmarkItems.splice(bookmarkedIndex, 1);
        if (state.searchJobItems) {
            const matchedItem = [...document.querySelectorAll('.job-item__link')].find(item => {
                return item.getAttribute('href') == jobItemId
            });
            console.log(matchedItem.querySelector('.job-item__bookmark-icon').classList);
            
            matchedItem.querySelector('.job-item__bookmark-icon').classList.remove('job-item__bookmark-icon--bookmarked');
        };
    };
    renderJobItems('bookmark');

}

jobListSearchEl.addEventListener('click', jobItemClickHandler);
jobDetailsContentEl.addEventListener('click', jobDetailClickHandler);

bookmarksBtnEl.addEventListener('mouseenter', () => {
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    jobListBookmarksEl.classList.add('job-list--visible');
});

bookmarksBtnEl.addEventListener('mouseleave', () => {
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    jobListBookmarksEl.classList.remove('job-list--visible');
});
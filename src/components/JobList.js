import {
    apiUrl, jobListBookmarksEl,jobDetailsEl, jobDetailsContentEl, jobListSearchEl, spinnerJobDetailsEl, getData, state
} from '../Common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import { renderJobDetails } from './renderHTML.js'


// expand job details

const clickHandler = async event => {
    event.preventDefault();
    const clickedJobEl = event.target.closest('.job-item');
    document.querySelectorAll('.job-item--active').forEach(item => item.classList.remove('job-item--active'));
    // Nokteye hagh ***
    // document.querySelector('.job-item--active')?.classList.remove('job-item--active')
    clickedJobEl.classList.add('job-item--active');
    jobDetailsContentEl.textContent = '';
    renderSpinner('jobDetails');
    const jobId = clickedJobEl.querySelector('.job-item__link').getAttribute('href');
    state.activeJobItem = state.searchJobItems.find(jobItem => jobItem.id == jobId);    
    history.pushState(null,null,`/#${jobId}`);
    // khate balaro injoor ham mishe nevesht
    // clickedJobEl.children[0].getAttribute('href');
    try {
        const data = await getData(`${apiUrl}/jobs/${jobId}`)
        renderSpinner('jobDetails');
        const { jobItem: job } = data;
        renderJobDetails(job);
    } catch (error) {
        console.log(error.toString());
        renderSpinner('jobDetails');
        renderError(error.message);
    };

};
jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);
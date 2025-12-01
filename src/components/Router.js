import { getData, apiUrl, jobDetailsContentEl, state } from '../Common.js'
import renderSpinner from './Spinner.js'
import renderError from './Error.js';
import { renderJobDetails } from './renderHTML.js'

const loadHandler = async () => {
    const jobId = window.location.hash.substring(1);
    if (jobId) {
        jobDetailsContentEl.textContent = '';
        renderSpinner('jobDetails');
        try {
            const data = await getData(`${apiUrl}/jobs/${jobId}`)
            renderSpinner('jobDetails');
            const { jobItem: job } = data;
            state.activeJobItem = job;
            renderJobDetails(job);
        } catch (error) {
            console.log(error.toString());
            renderSpinner('jobDetails');
            renderError(error.message);
        };
    };

};



window.addEventListener('DOMContentLoaded', loadHandler);
window.addEventListener('hashchange', loadHandler);
import {
    apiUrl, jobListSearchEl, numberEl, paginationNumberNextEl,
    searchFormEl, searchInputEl, spinnerSearchEl, getData
} from '../Common.js';
import renderError from './Error.js'
import renderSpinner from './Spinner.js';
import { renderJobItems } from './renderHTML.js'

// Search Component

const submitHandler = async event => {
    event.preventDefault();
    // Search input text
    const searchText = searchInputEl.value;

    // Search Validations
    const invalidInput = /[1-9]/;
    const textMatch = invalidInput.test(searchText);
    if (textMatch) {
        renderError("Your search can't contains number.")
        return;
    };
    searchInputEl.blur();
    jobListSearchEl.textContent = '';
    numberEl.textContent = 0;
    renderSpinner('search');


    try {
        const data = await getData(`${apiUrl}/jobs?search=${searchText}`);
        renderSpinner('search');
        const { jobItems: jobs } = data;

        numberEl.textContent = jobs.length;
        renderJobItems(jobs);
    }
    catch (error) {
        console.log(error.message);
        renderSpinner('search');
        renderError(error.message);
    }
};

searchFormEl.addEventListener('submit', submitHandler);
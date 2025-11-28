import { errorEl, errorTextEl, timeoutDuration } from "../Common.js";

const renderError = message => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => { errorEl.classList.remove('error--visible'); }, timeoutDuration);
};

export default renderError;
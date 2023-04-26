import { html, render } from '../../node_modules/lit-html/lit-html.js';


let searchTimeout = null;
const searchTimeoutDuration = 500;

export function searchOnTyping(e) {
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!dashboardElements.searchField().value) {
        dashboardElements.searchField().classList.remove('searching');
    } else {
        dashboardElements.searchField().classList.add('searching');
    }

    if (dashboardElements.searchField().value) {






    }
}

import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { arrayParser, dashboardElements } from '../util/util.js';


let searchTimeout = null;
const searchTimeoutDuration = 500;

export function searchOnTyping(e) {
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!dashboardElements.searchField().value) {
        dashboardElements.searchResult().classList.remove('active');
        dashboardElements.searchResult().innerHTML = '';
        dashboardElements.searchField().classList.remove('searching');
    } else {
        dashboardElements.searchField().classList.add('searching');
    }

    if (dashboardElements.searchField().value) {
        // search query: e.g.: 'London', 'New York'
        searchTimeout = setTimeout(() => {
            // get a returned api URL from an api call
            // fetch it (figure out how to render it using what I've got)


            dashboardElements.searchResult().classList.add('active');
            dashboardElements.searchField().classList.remove('searching');


            // fill out with found locations - and render it with lit-html, not innerHTML

            // dashboardElements.searchResult(). innerHTML = `
            // <ul class="view-list" data-search-list>
            //     <li class="view-item">
            //         <span class="m-icon">location_on</span>
            //         <div>
            //             <p class="item-title">London</p>
            //             <p class="label-2 item-subtitle">State of London, GB</p>
            //         </div>
            //         <a href="javascript:void(0)" class="item-link has-state"
            //         data-search-toggler></a>
            //     </li>
            // </ul>
            // `;

        }, searchTimeoutDuration);
    }

}


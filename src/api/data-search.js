import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { dashboardElements } from '../util/util.js';


let placeGlobal = null;
// API       key=AIzaSyDmBG4n4aLo7d3AsdgTJyONlli7WLIot0s
// src link  https://maps.googleapis.com/maps/api/js?key=AIzaSyDmBG4n4aLo7d3AsdgTJyONlli7WLIot0s&callback=initAutocomplete&libraries=places&v=weekly"
export async function getLocation(place) {
    placeGlobal = place;
    getCoords(place); // moje i da ne trea i tyka da go svur6a i gotovo
    // console.log(place);
    // console.log(place.geometry.location.lat(), place.geometry.location.lng());
    window.place = place; // moje i v local storage da go paza tva 100% !!! do it tomor
    return place;
}
window.getLocation = getLocation; // allows the use of it inside the index.html !!!


let searchTimeout = null;
const searchTimeoutDuration = 500;

export function searchOnTyping(e) {
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!dashboardElements.searchField().value) {
        dashboardElements.searchResult().classList.remove('active');
        dashboardElements.searchResult(). innerHTML = '';
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

        });
    }

}



export function getCoords(place) {
    console.log(place);
    console.log(place.geometry.location.lat(), place.geometry.location.lng());
}
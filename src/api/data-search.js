import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { arrayParser, dashboardElements } from '../util/util.js';


export async function reverseGeocoding(lat, lng) {
    let res = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&featureTypes=&location=${lat},${lng}`);
    let data = await res.json();
    return data;
}

let placeGlobal = null;
export function getLocation(place) {
    if (place == null) return;
    delete place.utc_offset; // utc_offser is deprecated and throws errors
    console.log(place);
    placeGlobal = place;
    const coords = getCoords(place);
    console.log(coords);
    window.place = place;
    let info = [coords[0], coords[1], place.formatted_address, place];
    let address = arrayParser.addressParser(place.formatted_address, place.name);
    console.log(address);
    address = address.split(', ');
    if (address[address.length - 1] == 'USA') {
        let stateUSA = place.formatted_address.split(', ').reverse().find(x => x.length == 2);
        if (stateUSA != '' && stateUSA) {
            address.splice(1, 0, stateUSA);
        }
    }
    address = address.join(', ');
    localStorage.setItem('lat', coords[0]);
    localStorage.setItem('lng', coords[1]);
    localStorage.setItem('address', address);
    localStorage.setItem('full-address', place.formatted_address);
    localStorage.setItem('place', JSON.stringify(place));
    location.href = '/dashboard';
}
window.getLocation = getLocation; // allows the use of it inside the index.html !!!


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



export function getCoords(place) {
    return [place.geometry.location.lat(), place.geometry.location.lng()];
}
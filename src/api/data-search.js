import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { arrayParser, dashboardElements, searchUtility } from '../util/util.js';
import { getGeolocation } from './api.js';
import { getParsedWeatherData, renderWeather } from './data-weather.js';


let searchTimeout = null;
const searchTimeoutDuration = 500;

export function searchOnTyping(e) {
    // runs on each input letter
    searchTimeout ?? clearTimeout(searchTimeout);

    if (!dashboardElements.searchField().value) {
        dashboardElements.searchField().classList.remove('searching');
        dashboardElements.searchResult().classList.remove('active');
        dashboardElements.searchResult().replaceChildren();
    } else {
        dashboardElements.searchField().classList.add('searching');
    }

    if (dashboardElements.searchField().value) {
        searchTimeout = setTimeout(async () => {
            try {
                let geoL = await getGeolocation(dashboardElements.searchField().value);
                if (!geoL) {
                    console.log('No response!');
                    return;
                }
                dashboardElements.searchField().classList.remove('searching');
                dashboardElements.searchResult().classList.add('active');
                dashboardElements.searchResult().replaceChildren();

                let items = geoL.data;
                let ul = document.createElement('ul');
                ul.classList.add('view-list');
                ul.setAttribute('data-search-list', '');
                render(searchItemsTemplate(items), ul);
                dashboardElements.searchResult().appendChild(ul);
            } catch (error) {
                console.log(error);
            }
        }, searchTimeoutDuration);
    }
}

const searchItemsTemplate = (items) => html`
    ${items.length != 0 ?
        items.map(x => {
            let nameString = x.name;
            nameString = x.state ? `${nameString}, ${x.state}` : nameString;
            nameString = x.country ? `${nameString}, ${x.country}` : nameString;
            return searchItemTemplate(x.name, nameString, x.lat, x.lon);
        })
        : noItemsTemplate()
    }
`;

const noItemsTemplate = () => html`
<li class="view-item">
    <span class="m-icon">location_on</span>
    <div>
        <p class="item-title">No Results.</p>
        <p class="label-2 item-subtitle">...</p>
    </div>
</li>
`;

const searchItemTemplate = (name, nameString, lat, lon) => html`
<li class="view-item" data-lat=${lat} data-lon=${lon}>
    <span class="m-icon">location_on</span>
    <div>
        <p class="item-title">${name}</p>
        <p class="label-2 item-subtitle">${nameString}</p>
    </div>
    <a @click=${onSearchClick} class="item-link has-state" data-search-toggler></a>
</li>
`;



export async function onSearchClick(e) {
    e.preventDefault();
    let isValid = true;
    let [lat, lon] = [e.target.parentElement.dataset.lat, e.target.parentElement.dataset.lon];
    if (!lat || !lon) isValid = false;
    if (!isValid) { // the default London list item
        lat = 51.5073219;
        lon = -0.1276474;
    }
}

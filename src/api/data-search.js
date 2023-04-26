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






    }
}

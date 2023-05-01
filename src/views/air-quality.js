import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAQI } from '../api/api.js';
import { getParsedAQIData, renderAQI } from '../api/data-aqi.js';
import { applyBlur, getCurrentTimeZone, getParsedWeatherData, removeErrorOverlay, renderErrorOverlay } from '../api/data-weather.js';
import { aqiElements, elements } from '../util/util.js';
// import from api

let context = null;
let defaultCoords = [];
let currentAQIinfo = {};
export async function airQualityPage(ctx) {
    context = ctx;
    ctx.render(initialTemplate());
    applyBlur(aqiElements.aqiWrapper());
    try {
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            defaultCoords = [localStorage.getItem('lat'), localStorage.getItem('lon')];
        } else {
            let currentCoords = await getCurrentLocationCoords();
            if (currentCoords[0] == 'no access') {
                let message = `Please allow us to use your Geolocation
                or Search for another location above.`;
                renderErrorOverlay(message);
                return;
            } else {
                localStorage.setItem('lat', currentCoords[0]);
                localStorage.setItem('lon', currentCoords[1]);
                defaultCoords = [currentCoords[0], currentCoords[1]];
            }
        }
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        let aqiInfo = await getParsedAQIData(defaultCoords);
        currentAQIinfo = {};
        currentAQIinfo = { ...aqiInfo };
        renderAQI('air-quality', aqiInfo);
        removeErrorOverlay();
        console.log(aqiInfo);
    } catch (error) {
        let message = 'Error getting Air Quality data!';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(aqiElements.aqiWrapper());
    }
}



async function onDetails(e) {
    e.preventDefault();
    let item = e.currentTarget;
    console.log(item);;
    // let id = item.dataset.id;
    // context.page.redirect(`/details/${id}`);
}

const itemsTemplate = (items) => html`
`;

const itemTemplate = (item) => html`
`;

const noItemsTemplate = () => html`
`;

const initialTemplate = () => html`

`;


import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAQI } from '../api/api.js';
import { getCurrentTimeZone } from '../api/data-weather.js';
// import from api

let context = null;
export async function airQualityPage(ctx) {
    context = ctx;
    ctx.render(initialTemplate());
    let testData = await getAQI(42, 23, getCurrentTimeZone()); // ADJUST with supportive func
    console.log(testData);
}

// TODO - no hourly, just dynamic dashboard with current data and btn for refresh data
// also buttons for more info for each, with links to the wiki pages & maybe meteo's

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


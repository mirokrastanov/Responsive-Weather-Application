import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAQI } from '../api/api.js';
import { getParsedAQIData } from '../api/data-aqi.js';
import { getCurrentTimeZone } from '../api/data-weather.js';
// import from api

let context = null;
export async function airQualityPage(ctx) {
    context = ctx;
    ctx.render(initialTemplate());
    let testData = await getParsedAQIData([41.8781, 87.6298]); // ADJUST LATER (now: chicago)
    console.log(testData);
    // ADD the whole mechanism from dashboard to copy the logic to save time
}

// TODO - put hourly into a hidden div - chek the tab saved in chrome

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


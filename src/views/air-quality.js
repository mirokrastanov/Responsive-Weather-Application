import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAQI } from '../api/api.js';
import { getCurrentTimeZone } from '../api/data-weather.js';
// import from api

let context = null;
export async function airQualityPage(ctx) {
    context = ctx;
    // let itemsArray = await getMyItems(); // TO ADD in API
    // if (!itemsArray) itemsArray = [];
    // // let itemsArray = [];
    // ctx.render(itemsTemplate(itemsArray));
    ctx.render(initialTemplate());
    let testData = await getAQI(42, 23, getCurrentTimeZone());
    console.log(testData);
    document.querySelector('#aqi-ctr').style.display = 'flex'; // REMOVE when page gets dynamic
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


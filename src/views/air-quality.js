import { html } from '../../node_modules/lit-html/lit-html.js';
// import from api

let context = null;
export async function airQualityPage(ctx) {
    // console.log(ctx);
    context = ctx;
    let itemsArray = await getMyItems(); // TO ADD in API
    if (!itemsArray) itemsArray = [];
    // let itemsArray = [];
    ctx.render(itemsTemplate(itemsArray));
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

import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function homePage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(homeTemplate());
}

const homeTemplate = () => html`
`; 

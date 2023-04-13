import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function errorPage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(errorTemplate());
}

const errorTemplate = () => html`
`; 

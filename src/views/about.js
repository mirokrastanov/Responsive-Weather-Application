import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function aboutPage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(aboutTemplate());
}

const aboutTemplate = () => html`
`; 


//  <div><a href="https://github.com/mirokrastanov" target="_blank">Author</a></div>
 
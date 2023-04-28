import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function aboutPage(ctx) {
    context = ctx;
    ctx.render(aboutTemplate());
}

const aboutTemplate = () => html`
<div>TEST - ABOUT</div>
<span class="error-overlay">Read ALL notes from the last month 
    to fill the Credits PROPERLY and to not miss something!!!</span>
`; 


//  <div><a href="https://github.com/mirokrastanov" target="_blank">Author</a></div>
 
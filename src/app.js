import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { aboutPage } from './views/about.js';
import { airQualityPage } from './views/air-quality.js';
import { errorPage } from './util/error.js';
import { elements, routes } from './util/util.js';

const root = document.querySelector('body main #main-ctr');


// TODO - create views ==> Home, Weather Dashboard, Air Quality Page, About, Error 404

page(mainMiddleware);
page('/', homePage);
page('/index.html', homePage);
page('/dashboard', dashboardPage);
page('/air-quality', airQualityPage);
page('/about', aboutPage);
page('*', errorPage);
page.start();
// updateNav();

function updateNav(path) {
    elements.forEach(x => {
        let el = x;
        if (x.tagName == 'DIV') el = x.querySelector('a');
        if (path == el.pathname) x.classList.add('nav-active');
        else x.classList.remove('nav-active');
    })
}

function mainMiddleware(ctx, next) {
    // console.log(ctx);
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav(ctx.path);
    next();
}

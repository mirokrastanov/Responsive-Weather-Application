import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { aboutPage } from './views/about.js';
import { airQualityPage } from './views/air-quality.js';
import { errorPage } from './util/error.js';

const root = document.querySelector('body main #main-ctr');

// TODO - create views ==> Home, Weather Dashboard, Air Quality Page, About, Error 404

page(mainMiddleware);
page('/', homePage);
page('/index.html', homePage);
page('/dashboard', dashboardPage);
page('/my-dashboard', airQualityPage);
page('/about', aboutPage);
page('*', errorPage);
page.start();
updateNav();

function updateNav() {
    // TODO
}

function mainMiddleware(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

import { html } from '../../node_modules/lit-html/lit-html.js';
// import from api

let context = null;
export async function dashboardPage(ctx) {
    context = ctx;
    // let itemsArray = await getAllItems(); // TO ADD in API
    // if (!itemsArray) itemsArray = [];
    // // let itemsArray = [];
    // ctx.render(itemsTemplate(itemsArray));
    ctx.render(initialTemplate());
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
<div class="header">
    <div class="container">
        <a href="javascript:void(0)" class="logo">
        <img src="/src/images/logo.png" alt="page-logo" width="364" height="58">
        </a>
        <div class="search-view" data-search-view>

        <div class="search-wrapper">
            <input type="search" name="search" placeholder="Search city ..." autocomplete="off" class="search-field"
            data-search-field>

            <span class="m-icon">search</span>

            <button class="icon-btn leading-icon has-state" aria-label="close search" data-search-toggler>
            <span class="m-icon">arrow_back</span>
            </button>

        </div>

        <div class="search-result" data-search-result>
            <ul class="view-list" data-search-list>

            <li class="view-item">
                <span class="m-icon">location_on</span>

                <div>
                <p class="item-title">London</p>

                <p class="label-2 item-subtitle">State of London, GB</p>
                </div>

                <a href="javascript:void(0)" data-search-toggler class="item-link has-state"></a>
            </li>

            </ul>
        </div>

        </div>

        <div class="header-actions">

        <button class="icon-btn has-state" aria-label="open search" data-search-toggler>
            <span class="m-icon icon">search</span>
        </button>

        <a href="javascript:void(0)" class="btn-primary has-state"data-current-location-btn>
            <!-- na a-to otgore (#/current-location) -->
            <span class="m-icon">my_location</span>

            <span class="span">Current Location</span>
        </a>
        </div>

        <!-- TODO more -->

    </div>
</div>
`;
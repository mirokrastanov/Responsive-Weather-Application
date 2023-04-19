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
            <img src="/src/images/logo.gif" alt="logo" width="364" height="58">
        </a>

        <div class="search-view" data-search-view> <!-- toggle .active for testing -->
            <div class="search-wrapper">
                <input type="search" name="search" placeholder="Search city ..." 
                autocomplete="off" class="search-field" data-search-field>
                <span class="m-icon leading-icon">search</span>
                <button class="icon-btn leading-icon has-state" aria-label="close search" 
                data-search-toggler>
                    <span class="m-icon">arrow_back</span>
                </button>
            </div> <!-- search-wrapper ends here -->

            <div class="search-result" data-search-result> <!-- toggle .active for testing -->
                <ul class="view-list" data-search-list>
                    <li class="view-item">
                        <span class="m-icon">location_on</span>
                        <div>
                            <p class="item-title">London</p>
                            <p class="label-2 item-subtitle">State of London, GB</p>
                        </div>
                        <a href="javascript:void(0)" class="item-link has-state"
                        data-search-toggler></a>
                    </li>
                </ul>
            </div> <!-- search-result ends here -->
        </div> <!-- search-view ends here -->


        <div class="header-actions">
            <button class="icon-btn has-state" aria-label="open search" data-search-toggler>
                <span class="m-icon icon">search</span>
            </button>

            <!-- below target = (#/current-location) -->
            <a href="javascript:void(0)" class="btn-primary has-state"data-current-location-btn>
                <span class="m-icon">my_location</span>

                <span class="span">Current Location</span>
            </a>
        </div>

    </div> <!-- div.container ends here -->
</div> <!-- div.header ends here -->

<main>
    <article class="container">
        <div class="content-left">
            <!-- CURRENT WEATHER -->
            <section class="section current-weather" aria-label="current weather"
                data-current-weather>
                <div class="card card-lg current-weather-card">
                
                    <h2 class="title-2 card-title">Now</h2>

                    <div class="weapper">
                        <p class="heading">25&deg;<sup>c</sup></p>

                        <img src="/src/images/weather-icons/01d.png" width="64px"
                        height="64px" alt="Overcast Clouds" class="weather-icon">
                    </div>

                    <p class="body-3">Overcast Clouds</p>
                    
                    <ul class="meta-list">
                        <li class="meta-item">
                            <span class="m-icon">calendar_today</span>
                            <p class="title-3 meta-text">Thursday 16, Feb</p>
                        </li>
                        <li class="meta-item">
                            <span class="m-icon">location_on</span>
                            <p class="title-3 meta-text">London, GB</p>
                        </li>

                    </ul>
                </div> 
            </section> <!-- current weather ends here -->
            
            <!-- FORECAST -->
            <section class="section forecast" aria-labelledby="forecast-label" data-5-day-forecast>
                <h2 class="title-2" id="forecast-label">Weekly Forecast</h2>

                <div class="card card-lg forecast-card">
                    <ul>
                        <li class="card-item"> <!-- li 1 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 2 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 3 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 4 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 5 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 6 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>
                        <li class="card-item"> <!-- li 7 -->
                            <div class="icon-wrapper">
                                <img src="/src/images/weather-icons/01n.png" alt="Overcast Clouds" 
                                width="36" height="36px" class="weather-icon">
                            
                                <span class="span">
                                    <p class="title-2">25</p>
                                </span>
                            </div>

                            <p class="label-1">17 Feb</p>
                            <p class="label-1">Friday</p>

                        </li>

                    </ul>
                </div> <!-- div.card.card-lg.forecast-card ends here -->
            </section>
        </div> <!-- div.content-left ends here -->

        <div class="content-right">
            
            <!-- HIGHLIGHTS -->
            <section class="section highlights" aria-labelledby="highlights-label" data-highlights>
                <div class="card card-lg">
                    
                    <h2 class="title-2" id="highlights-label">Todays Highlights</h2>

                    <div class="highlight-list">

                        <div class="card card-sm highlight-card one">
                            
                            <h3 class="title-3">Air Quality Index</h3>
                            
                            <div class="wrapper">

                                <span class="m-icon">air</span>

                                <ul class="card-list">

                                    <li class="card-item">
                                        <p class="title-1">23.3</p>

                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                    <li class="card-item">
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                    <li class="card-item">
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                    <li class="card-item">
                                        <p class="title-1">23.3</p>
                                        
                                        <p class="label-1">PM<sub>2.5</sub></p>
                                    </li>

                                </ul>
                            </div>

                            <span id="aqi-link" title="aqi more info">More Info</span>
                            <span class="badge aqi-1 label-1" title="aqi message">Good</span>

                        </div>

                        <div class="card card-sm highlight-card two">
                            
                            <h3 class="title-3">Sunrise & Sunset</h3>

                            <div class="card-list">

                                <div class="card-item">
                                    <span class="m-icon">nest_clock_farsight_analog</span>

                                    <div>
                                        <p class="label-1">Now</p>
                                        
                                        <p class="title-1">12:30 PM</p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="m-icon">clear_day</span>

                                    <div>
                                        <p class="label-1">Sunrise</p>
                                        
                                        <p class="title-1">6:30 AM</p>
                                    </div>
                                </div>

                                <div class="card-item">
                                    <span class="m-icon">clear_night</span>

                                    <div>
                                        <p class="label-1">Sunset</p>
                                        
                                        <p class="title-1">5:54 PM</p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    
                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Feels Like</h3>

                            <div class="wrapper">
                                <span class="m-icon">thermostat</span>
                                
                                <p class="title-1">25&deg;<sup>c</sup></p>
                            </div>
                        </div>

                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Wind</h3>

                            <div class="wrapper">
                                <span class="m-icon">wind_power</span>
                                
                                <p class="title-1">12<sub>km/h</sub></p>
                            </div>
                        </div>

                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Humidity</h3>

                            <div class="wrapper">
                                <span class="m-icon">humidity_percentage</span>
                                
                                <p class="title-1">35<sub>%</sub></p>
                            </div>
                        </div>

                         <div class="card card-sm highlight-card">

                            <h3 class="title-3">Precipitation</h3>

                            <div class="wrapper">
                                <span class="m-icon">cloudy_snowing</span>
                                
                                <p class="title-1">4<sub>cm</sub></p>
                            </div>
                        </div>
                                            
                        <div class="card card-sm highlight-card">
                            
                            <h3 class="title-3">Visibility</h3>
                            
                            <div class="wrapper">
                                <span class="m-icon">visibility</span>
                                
                                <p class="title-1">10<sub>km</sub></p>
                            </div>
                        </div>
                        
                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Pressure</h3>

                            <div class="wrapper">
                                <span class="m-icon">airwave</span>
                                
                                <p class="title-1">1052<sub>hPa</sub></p>
                            </div>
                        </div>
                    
                    </div> <!-- div.highlight-list ends here -->

                </div>
            </section> <!-- section.section.highlights ends here -->

            <!-- HOURLY -->
            <section class="section hourly-forecast" aria-label="hourly forecast"
                data-hourly-forecast>
                
                <h2 class="title-2">Hourly Forecast</h2>
                
                <div class="slider-container">
                    <ul class="slider-list" data-temp>

                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/01n.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">25&deg;</p>
                            </div>
                        </li>

                    </ul>

                    <ul class="slider-list" data-wind>

                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 km/h</p>
                            </div>
                        </li>

                    </ul>

                    <h2 class="title-2" id="h-info">More Info</h2>

                </div>

            </section> <!-- div.section.hourly-forecast ends here -->

            <footer class="footer">
                <p class="body-3">
                    Author: Miro Krastanov. Extra credits in the About section.
                </p>

                <p class="body-3">
                    Powered By <a href="https://open-meteo.com/" title="Free Weather API"
                    target="_blank" rel="noopener">
                        <img src="/src/images/open-meteo.gif" width="150px" height="30px"
                        loading="lazy" alt="Open-Meteo">
                    </a>
                </p>
            </footer>
        </div> <!-- div.content-right ends here -->

        <div class="loading" data-loading></div>
        
    </article> <!-- article.container ends here -->
</main>
`;
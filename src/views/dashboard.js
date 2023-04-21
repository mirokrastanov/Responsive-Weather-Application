import { html } from '../../node_modules/lit-html/lit-html.js';
import { getWeather } from '../api/api.js';
import { applyBlur, createErrorOverlay, getCurrentTimeZone, getParsedWeatherData, removeBlur, renderWeather } from '../api/data.js';
import { elements } from '../util/util.js';

// import from api

let context = null;
export async function dashboardPage(ctx) {
    context = ctx;
    // let itemsArray = await getAllItems(); // TO ADD in API
    // if (!itemsArray) itemsArray = [];
    // // let itemsArray = [];
    // ctx.render(itemsTemplate(itemsArray));

    ctx.render(dashboardTemplate());
    document.querySelector('article.container').style.display = 'grid';
    applyBlur(elements.main());
    try {
        let rawInfo = await getWeather(42.7, 23.32, getCurrentTimeZone());
        let parsedInfo = getParsedWeatherData(rawInfo);
        renderWeather(parsedInfo); // DYNAMIC DATA is pulled from here
        console.log(parsedInfo);


        // initial TEST with dynamic info
        document.querySelector('.section.current-weather .card.card-lg.current-weather-card img.weather-icon')
            .setAttribute('src', parsedInfo.current.weatherImage);


        // IF NO ITEMS - enable blur and show alert - no data , or something

        // Finally, render with the items object fed as a parameter to the template
        removeBlur(elements.main());
    } catch (error) {
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert('Error getting weather data!');
        elements.dotHeader().appendChild(createErrorOverlay());
        // APPLY LOADING ANIMATION as well
        applyBlur(elements.main());
    }
}

async function hourlyDetails(e) {
    e.preventDefault();

    context.render(hourlyTemplate());
    document.querySelector('article.container').style.display = 'block';
    // enable BLUR initially while still fetching

    try {
        // follow the dashboard fetching example, prob can take the same object
        // Code here... get items

        // IF NO ITEMS - enable blur and show alert - no data , or something

        // Finally, render with the items object fed as a parameter to the template
    } catch (error) {
        console.error(error);
        alert('Error getting weather data!');
        // AND enable BLUR again
    }

}

async function redirectToAqi(e) {
    e.preventDefault();

    context.render(dashboardTemplate());
}


// array(7) = daily
const weeklyForecastTemplate = (items = []) => html``;


// array(16) = hourly*
// hourly* = cut only 0, 2, 5, 8, 11, etc INDICES for every 3h and stop after 16 elems
const dashboardHourlyTemplate = (items = []) => html``;


// main.blurred applied - remove with removeBlur() function as needed
const dashboardTemplate = (items = {}) => html`
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

                        <img src="/src/images/weather-icons/01d.png" width="60px"
                        height="60px" alt="Overcast Clouds" class="weather-icon">
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

                            <a href="/air-quality" id="aqi-link" title="aqi more info">More Info</a>
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
                                
                                <p class="title-1">12 <sub>m/s</sub></p>
                            </div>
                        </div>

                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Humidity</h3>

                            <div class="wrapper">
                                <span class="m-icon">humidity_percentage</span>
                                
                                <p class="title-1">35 <sub>%</sub></p>
                            </div>
                        </div>

                         <div class="card card-sm highlight-card">

                            <h3 class="title-3">Precipitation</h3>

                            <div class="wrapper">
                                <span class="m-icon">cloudy_snowing</span>
                                
                                <p class="title-1">0.04 <sub>mm</sub></p>
                            </div>
                        </div>
                                            
                        <div class="card card-sm highlight-card">
                            
                            <h3 class="title-3">Visibility</h3>
                            
                            <div class="wrapper">
                                <span class="m-icon">visibility</span>
                                
                                <p class="title-1">10 <sub>km</sub></p>
                            </div>
                        </div>
                        
                        <div class="card card-sm highlight-card">

                            <h3 class="title-3">Pressure</h3>

                            <div class="wrapper">
                                <span class="m-icon">airwave</span>
                                
                                <p class="title-1">1052 <sub>hPa</sub></p>
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

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>
                        
                        <li class="slider-item">
                            <div class="card card-sm slider-card">
                                <p class="body-3">03 PM</p>

                                <img src="/src/images/weather-icons/direction.png" width="48" height="48"
                                loading="lazy" alt="" class="weather-icon" title="">

                                <p class="body-3">12 m/s</p>
                            </div>
                        </li>

                    </ul>

                    <h2 @click=${hourlyDetails} class="title-2" id="h-info">Detailed Hourly Info</h2>

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


// main.blurred applied - remove with removeBlur() function as needed
const hourlyTemplate = (items = {}) => html`
<div class="header">
    <div class="container">

        <a href="javascript:void(0)" class="logo">
            <img src="/src/images/logo.gif" alt="logo" width="364" height="58">
        </a>

        <div class="h-forecast-title">Hourly Forecast</div>

        <div class="header-actions">
            <a href="/dashboard" id="h-forecast-btn">Back to Dashboard</a>
        </div>

    </div> <!-- div.container ends here -->
</div> <!-- div.header ends here -->

<main>
    <article class="container">
        <div class="content-middle">
            <div class="blurred">
                <table class="hour-section">
                    <tbody data-hour-section>
                        <!-- add dynamic info to each row -->
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                        ${html`${hourRowTemplate()}`}
                    
                        <!-- AND condition for no items shown -->
                    </tbody>
                </table>

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
            </div>
        </div>
    </article>
</main>
`;


const hourRowTemplate = (item = {}) => html`
<tr class="hour-row">
    <td>
        <div class="info-group">
            <div class="label">Thursday, May 17</div>
            <div>3 PM</div>
        </div>
    </td>
    <td>
        <img src="/src/images/weather-icons/09n.png" class="weather-icon"
        height="60px" width="60px" />
    </td>
    <td>
        <div class="info-group">
            <div class="label">Precip</div>
            <div>0.02 mm</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Wind</div>
            <div>26 m/s</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Humidity</div>
            <div>84 %</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Visibility</div>
            <div>14 km</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Temp</div>
            <div>31&deg;</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">FL Temp</div>
            <div>25&deg;</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Precip %</div>
            <div>25 %</div>
        </div>
    </td>
    <td>
        <img src="/src/images/weather-icons/direction.png" class="weather-icon"
        height="40px" width="40px" />
    </td>
    <td>
        <div class="info-group">
            <div class="label">Pressure</div>
            <div>1011 hPa</div>
        </div>
    </td>
    <td>
        <div class="info-group">
            <div class="label">Cloud cover</div>
            <div>65 %</div>
        </div>
    </td>
</tr>
`;


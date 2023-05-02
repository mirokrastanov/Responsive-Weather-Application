import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAQI } from '../api/api.js';
import { getParsedAQIData, renderAQI } from '../api/data-aqi.js';
import { applyBlur, getCurrentTimeZone, getParsedWeatherData, removeErrorOverlay, renderErrorOverlay } from '../api/data-weather.js';
import { aqiElements, elements } from '../util/util.js';
// import from api

let context = null;
let defaultCoords = [];
let currentAQIinfo = {};
export async function airQualityPage(ctx) {
    context = ctx;
    ctx.render(initialTemplate());
    applyBlur(aqiElements.aqiWrapper());
    try {
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            defaultCoords = [localStorage.getItem('lat'), localStorage.getItem('lon')];
        } else {
            let currentCoords = await getCurrentLocationCoords();
            if (currentCoords[0] == 'no access') {
                let message = `Please allow us to use your Geolocation
                or Search for another location above.`;
                renderErrorOverlay(message);
                return;
            } else {
                localStorage.setItem('lat', currentCoords[0]);
                localStorage.setItem('lon', currentCoords[1]);
                defaultCoords = [currentCoords[0], currentCoords[1]];
            }
        }
        let weatherInfo = await getParsedWeatherData(defaultCoords);
        let aqiInfo = await getParsedAQIData(defaultCoords);
        currentAQIinfo = {};
        currentAQIinfo = { ...aqiInfo };
        renderAQI('air-quality', aqiInfo);
        removeErrorOverlay();
        console.log(weatherInfo);
        console.log(aqiInfo);
        aqiElements.btnHourly1().addEventListener('click', onHourlyBtnClick);
    } catch (error) {
        let message = 'Error getting Air Quality data!';
        console.log('Error details: ', { ...error, 'stack': error.stack });
        alert(message);
        renderErrorOverlay(message);
        applyBlur(aqiElements.aqiWrapper());
    }
}


function onHourlyBtnClick(e) {
    e.preventDefault();
    let btn = e.target;
    if (btn.textContent == 'Hourly Forecast') {
        hideAqiBoxes();

        // gen all rows 
        currentAQIinfo.hourly.forEach((x, i) => {
            if (i == 0) console.log(x);
            generateRow(x);
        });

    } else if (btn.textContent == 'Back to AQI Overview') {
        showAqiBoxes();
        if (aqiElements.aqiDynamicRows()) {
            aqiElements.aqiDynamicRows().forEach(x => x.remove());
        }
    }

}


function hideAqiBoxes() {
    aqiElements.aqiBoxToggle1().checked = false;
    document.querySelectorAll('.aqi-box').forEach(x => {
        if (x != aqiElements.aqiBoxEAQI()) {
            x.style.display = 'none';
        }
    });
    aqiElements.btnHourly1().textContent = 'Back to AQI Overview';
}

function showAqiBoxes() {
    aqiElements.aqiBoxToggle1().checked = false;
    document.querySelectorAll('.aqi-box').forEach(x => {
        if (x != aqiElements.aqiBoxEAQI()) {
            x.style.display = 'flex';
        }
    });
    aqiElements.btnHourly1().textContent = 'Hourly Forecast';
}

function generateRow(item = { test: true }) {
    let div = document.createElement('div');
    div.classList.add('aqi-row-all');
    render(aqiBoxRowTemplate(item), div);
    aqiElements.aqiFlexGrid().appendChild(div);
}

const aqiBoxRowTemplate = (item) => html`
    <div class="aqi-cell" style="background-color:var(${item.eAQI[3].bg});color:var(${item.eAQI[3].color});">
        <p class="aqi-title">${item.test ? 'Apr 17' : `${item.monthShort} ${item.date}`}</p>
        <p class="aqi-content">${item.test ? '3 PM' : item.hour} 
        <sub>${item.test ? 'Good' : item.eAQI[2]}</sub></p>
    </div>
    <div class="aqi-cell" style="background-color:var(${item.pm2_5[3].bg});color:var(${item.pm2_5[3].color});">
        <p class="aqi-title" title="Particles less than 2.5 µm (PM2.5)">
            PM<sub>2.5</sub></p>
        <p class="aqi-content" title="Particles less than 2.5 µm (PM2.5)">
            ${item.test ? '23' : item.pm2_5[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Particles less than 10 µm (PM10)">
            PM<sub>10</sub></p>
        <p class="aqi-content" title="Particles less than 10 µm (PM10)">
        ${item.test ? '23' : item.pm10[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Nitrogen dioxide (NO2)">
            NO<sub>2</sub></p>
        <p class="aqi-content" title="Nitrogen dioxide (NO2)">
        ${item.test ? '23' : item.no2[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Ozone (O3)">
            O<sub>3</sub></p>
        <p class="aqi-content" title="Ozone (O3)">
        ${item.test ? '23' : item.o3[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Sulphur dioxide (SO2)">
            SO<sub>2</sub></p>
        <p class="aqi-content" title="Sulphur dioxide (SO2)">
        ${item.test ? '23' : item.so2[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Carbon Monoxide (10m above ground)">
            CO</p>
        <p class="aqi-content" title="Carbon Monoxide (10m above ground)">
        ${item.test ? '23' : item.co[0]} <sub>μg/m³</sub></p>
    </div>
    <div class="aqi-cell">
        <p class="aqi-title" title="Dust particles (10m above ground)">
            Dust</p>
        <p class="aqi-content" title="Dust particles (10m above ground)">
        ${item.test ? '23' : item.dust[0]} <sub>μg/m³</sub></p>
    </div>
`;


















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
<div class="header" id="aqi-top">
    <div id="aqi-header-ctr">
        <div>
            <h1 id="aqi-h-title">Air Quality Details</h1>
        </div>
        <div>
            <p class="body-3">
                Author: Miro Krastanov. Extra credits in the About section.
            </p>
        </div>
        <div>
            <div id="flex-row">
                Powered By <a href="https://open-meteo.com/" title="Free Weather API" target="_blank"
                    rel="noopener">
                    <img src="/src/images/open-meteo.gif" width="150px" height="30px" loading="lazy"
                        alt="Open-Meteo">
                </a> and <a href="https://openweathermap.org/" title="Weather & Geo API" target="_blank"
                    rel="noopener">
                    <img src="/src/images/openweather.png" width="150px" height="30px" loading="lazy"
                        alt="Open-Meteo"></a>
            </div>
        </div>
    </div>
    <div class="loading" data-loading></div>
</div>


<div id="aqi-ctr">
    <div id="aqi-wrapper">
        <section id="aqi-flex">

            <div class="aqi-box">
                <p class="aqi-title">European Air Quality Index</p>
                <p class="aqi-content">Good</p>
                <div id="state-message"></div>
                <label class="aqi-box-btn" for="toggle-1">Details</label>
                <input type="checkbox" id="toggle-1">
                <div class="aqi-box-text">
                    <span>European Air Quality Index (AQI) calculated for different
                        particulate matter and gases individually. The consolidated european_aqi returns the
                        maximum of all individual indices. Ranges from 0-20 (good), 20-40 (fair), 40-60
                        (moderate), 60-80 (poor), 80-100 (very poor) and exceeds 100 for extremely poor
                        conditions.</span>
                    <span>More information here: <a class="info-link-inline"
                            href="https://www.eea.europa.eu/en" target="_blank">EEA</a>
                        <a class="info-link-inline" href="https://en.wikipedia.org/wiki/Air_quality_index"
                            target="_blank">Wiki</a></span>
                    <button class="render-hourly">Hourly Forecast</button>
                </div>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Particles less than 2.5 µm (PM2.5)">
                    PM<sub>2.5</sub></p>
                <p class="aqi-content" title="Particles less than 2.5 µm (PM2.5)">
                    23 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Particles less than 10 µm (PM10)">
                    PM<sub>10</sub></p>
                <p class="aqi-content" title="Particles less than 10 µm (PM10)">
                    16 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Nitrogen dioxide (NO2)">
                    NO<sub>2</sub></p>
                <p class="aqi-content" title="Nitrogen dioxide (NO2)">
                    90 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Ozone (O3)">
                    O<sub>3</sub></p>
                <p class="aqi-content" title="Ozone (O3)">
                    41 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Sulphur dioxide (SO2)">
                    SO<sub>2</sub></p>
                <p class="aqi-content" title="Sulphur dioxide (SO2)">
                    75 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Carbon Monoxide (10m above ground)">
                    CO</p>
                <p class="aqi-content" title="Carbon Monoxide (10m above ground)">
                    23 <sub>μg/m³</sub></p>
            </div>

            <div class="aqi-box">
                <p class="aqi-title" title="Dust particles (10m above ground)">
                    Dust</p>
                <p class="aqi-content" title="Dust particles (10m above ground)">
                    23 <sub>μg/m³</sub></p>
            </div>

        </section>
    </div>
</div>
`;


import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser, weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getWeather, reverseGeolocation } from "./api.js";

export function applyBlur(element) {
    element.classList.add('blurred');
}

export function removeBlur(element) {
    element.classList.remove('blurred');
}

export function createErrorOverlay(message) {
    let errorOverlay = document.createElement('a');
    errorOverlay.classList.add('error-overlay');
    errorOverlay.textContent = message;
    return errorOverlay;
}

export function renderErrorOverlay(message) {
    removeErrorOverlay();
    elements.dotHeader().appendChild(createErrorOverlay(message));
}

export function removeErrorOverlay() {
    if (document.querySelector('.error-overlay')) {
        document.querySelector('.error-overlay').remove();
    }
}

export function createNotificationOverlay() {
    let message = 'Information updated';
    let errorOverlay = document.createElement('a');
    errorOverlay.classList.add('notif-overlay');
    errorOverlay.textContent = message;
    return errorOverlay;
}

export function renderNotificationOverlay() {
    setTimeout(() => {
        removeNotificationOverlay();
        elements.dotHeader().appendChild(createNotificationOverlay());
        setTimeout(() => {
            removeNotificationOverlay();
        }, 2000);
    }, 500); // execute the whole render after 1 sec (for loading to clear out)
}

export function removeNotificationOverlay() {
    if (document.querySelector('.notif-overlay')) {
        document.querySelector('.notif-overlay').remove();
    }
}

export function getCurrentTimeZone() {
    // console.log(new Date().getMonth());
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function getCurrentLocationCoords() {
    let getPosition = async function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    let res;
    try {
        res = await getPosition();
        // console.log(res);
        return [res.coords.latitude, res.coords.longitude];
    } catch (error) {
        return ['no access', error.message];
    }
}

function returnDayLONG() {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long' }); // has .format func
}

function returnDaySHORT() {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short' }); // has .format func
}

function returnHour() {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }); // has .format func
}

function parseCurrentWeather(data) {
    let { current_weather, daily, hourly } = data;

    return {
        currentTemp: Math.round(current_weather.temperature),
        weatherCode: current_weather.weathercode,
        weatherText: weatherCodes[current_weather.weathercode],
        weatherImage: generateImage(current_weather.is_day, current_weather.weathercode),
        feelsLikeTemp: Math.round(hourly.apparent_temperature[0]),
        windSpeed: current_weather.windspeed,
        windDirection: current_weather.winddirection,
        humidity: hourly.relativehumidity_2m[0],
        precip: Math.round(hourly.precipitation[0] * 100) / 100,
        precipProbability: Math.round(hourly.precipitation_probability[0]),
        visibility: Math.round(hourly.visibility[0] * 100) / 100,
        pressure: Math.round(hourly.pressure_msl[0]),
        timeNow: current_weather.time * 1000,
        sunrise: daily.sunrise[0] * 1000,
        sunset: daily.sunset[0] * 1000,
        dayLong: returnDayLONG().format(current_weather.time * 1000),
        dayShort: returnDaySHORT().format(current_weather.time * 1000),
    }
}

function parseDailyWeather(data) {
    let { current_weather, daily } = data;

    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            weatherCode: daily.weathercode[index],
            weatherText: weatherCodes[daily.weathercode[index]],
            weatherImage: generateImage(current_weather.is_day, daily.weathercode[index]),
            temp: Math.round(daily.apparent_temperature_max[index]),
        }
    });

}

function parseHourlyWeather(data) {
    let { hourly, current_weather } = data;

    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            is_day: hourly.is_day[index],
            weatherCode: hourly.weathercode[index],
            weatherText: weatherCodes[hourly.weathercode[index]],
            weatherImage: generateImage(hourly.is_day[index], hourly.weathercode[index]),
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLikeTemp: Math.round(hourly.apparent_temperature[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100,
            precipProbability: Math.round(hourly.precipitation_probability[index]),
            windSpeed: hourly.windspeed_10m[index],
            windDirection: hourly.winddirection_10m[index],
            humidity: hourly.relativehumidity_2m[index],
            pressure: Math.round(hourly.pressure_msl[index]),
            visibility: Math.round(hourly.visibility[index] * 100) / 100,
            cloudCover: hourly.cloudcover[index],
            hour: returnHour().format(time * 1000),
            dayLong: returnDayLONG().format(time * 1000),
            date: new Date(time * 1000).getDate(),
            monthShort: monthsShort[new Date(time * 1000).getMonth()],
        }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
    // filter only the hours from current hour to after 7 days
}

function generateImage(isDay, weatherCode) {
    return isDay == 1
        ? weatherImgRoutesDAY[weatherCode]
        : weatherImgRoutesNIGHT[weatherCode]
}

export async function getParsedWeatherData(coords) {
    // let testRaw = await getWeather(42.7, 23.32, getCurrentTimeZone());
    let data = await getWeather(coords[0], coords[1], getCurrentTimeZone());
    let result = {
        raw: data,
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
    };
    result.current.is_day = result.hourly[0].is_day;
    return result;
}

export function applyLoading() {
    elements.loading().style.display = 'grid';
}

export function removeLoading() {
    elements.loading().style.display = 'none';
}

// invoked every 10m by updateWeatherInfo()
export function renderWeather(page, { current, daily, hourly }, flag = true) {
    renderCurrentWeather(page, current);
    renderDailyWeather(page, daily);
    renderHourlyWeather(page, hourly, flag);
    dashboardElements.lastUpdated().forEach(x => {
        setValue(x, `Last updated: ${timeParser.hours24()[0]}:${timeParser.min()} ${timeParser.hours24()[1]}`);
    });
    if (flag) {
        applyBlur(elements.main());
        applyLoading();
        renderNotificationOverlay();
        setTimeout(() => {
            removeBlur(elements.main());
            removeLoading();
        }, 500);
    }
}





// intervals for:
// [0]: updateWeatherInfo()
// [1]: updateDashboardTimeNow()
let prevIntervals = [null, null];
// invokes renderWeather() every 10m
export function updateWeatherInfo(page, { current, daily, hourly }) {
    if (prevIntervals[0]) {
        clearInterval(prevIntervals[0]);
        prevIntervals[0] = null;
    }
    let interval = setInterval(function () {
        renderWeather(page, { current, daily, hourly }, false);
    }, 2000);
    prevIntervals[0] = interval;
}

function setValue(element, value, addin = false) {
    if (!element) return; // prevents errors - continuous func
    if (addin) {
        // temp element is needed to prevent lit-html bug when re-rendering on top of
        // already rendered element without reloading the page - couldn't find another fix
        let temp = document.createElement('div');
        temp.textContent = value;
        render(addin, temp);
        element.innerHTML = temp.innerHTML; // prevents addins missing on nth re-render
    } else {
        element.textContent = value;
    }
}

function setImage(element, path) {
    if (!element) return; // prevents errors - continuous func
    element.setAttribute('src', path);
}

function updateDashboardTimeNow() { // updates timeNow every second
    if (prevIntervals[1]) {
        clearInterval(prevIntervals[1]);
        prevIntervals[1] = null;
    }
    let interval = setInterval(function () {
        let [hNow, mNow, sNow] = [timeParser.hours24(), timeParser.min(), timeParser.sec()];
        // console.log(sNow);
        if (dashboardElements.highYourTime()) {
            setValue(dashboardElements.highYourTime(), `${hNow[0]}:${mNow} ${hNow[1]}`);
        }
    }, 1000);
    prevIntervals[1] = interval;
}

async function renderCurrentWeather(page, current) {
    if (page == 'dashboard') {
        // CURRENT CARD
        setImage(dashboardElements.currentImg(), current.weatherImage);
        setValue(dashboardElements.currentTemp(), current.currentTemp, html`&deg;<sup>c</sup>`);
        setValue(dashboardElements.currentText(), current.weatherText);
        setValue(dashboardElements.currentDateDay(), `${current.
            dayLong} ${new Date().getDate()}, ${monthsShort[new Date().getMonth()]}`);
        // Location (current card)
        let lat = localStorage.getItem('lat');
        let lon = localStorage.getItem('lon');
        if (lat && lon) {
            let revGeoL = await reverseGeolocation(lat, lon);
            let x = revGeoL.data[0];
            let nameString = x.name;
            nameString = x.state ? `${nameString}, ${x.state}` : nameString;
            nameString = x.country ? `${nameString}, ${x.country}` : nameString;
            localStorage.setItem('address', nameString);
            setValue(dashboardElements.currentLocation(), nameString);
        }


        // TODAYS HIGHLIGHTS
        let [hNow, mNow, hRise, mRise, hSet, mSet] = [
            timeParser.hours24(), timeParser.min(),
            timeParser.hours24(new Date(current.sunrise)),
            timeParser.min(new Date(current.sunrise)),
            timeParser.hours24(new Date(current.sunset)),
            timeParser.min(new Date(current.sunset)),
        ];
        setValue(dashboardElements.highYourTime(), `${hNow[0]}:${mNow} ${hNow[1]}`);
        // time at location - display - difference i da go upd i nego s time now
        setValue(dashboardElements.highTimeSunrise(), `${hRise[0]}:${mRise} ${hRise[1]}`);
        setValue(dashboardElements.highTimeSunset(), `${hSet[0]}:${mSet} ${hSet[1]}`);
        updateDashboardTimeNow(); // continuous time update

        setValue(dashboardElements.highFeelsLike(), current.feelsLikeTemp, html`&deg;<sup>c</sup>`);
        setValue(dashboardElements.highWind(), current.windSpeed, html` <sub>m/s</sub>`);
        setValue(dashboardElements.highHumidity(), current.humidity, html` <sub>%</sub>`);
        setValue(dashboardElements.highPrecip(), current.precip, html` <sub>mm</sub>`);
        let visSmart = valueParser.visibility(current.visibility);
        setValue(dashboardElements.highVisibility(), visSmart[0], html` <sub>${visSmart[1]}</sub>`);
        setValue(dashboardElements.highPressure(), current.pressure, html` <sub>hPa</sub>`);
    } else if (page == 'hourly') {
        // remains in case its needed at a later point
    }
}

function renderDailyWeather(page, daily) {
    if (page == 'dashboard') {
        // DAILY FORECAST - 7 days
        dashboardElements.dailyImg().forEach((el, i) => {
            setImage(el, daily[i].weatherImage);
        });
        dashboardElements.dailyTemp().forEach((el, i) => {
            setValue(el, daily[i].temp, html`&deg;<sup>c</sup>`);
        });
        dashboardElements.dailyDateMonth().forEach((el, i) => {
            let dateRaw = new Date(daily[i].timestamp);
            let [date, month, day] =
                [dateRaw.getDate(), dateRaw.getMonth(), dateRaw.getDay()];
            setValue(el, `${daysShort[day]} ${date}, ${monthsShort[month]}`);
        });
        dashboardElements.dailyDay().forEach(el => {
            el.parentElement.removeChild(el);
        });
    } else if (page == 'hourly') {
        // remains in case its needed at a later point
    }
}

function renderHourlyWeather(page, hourly, flag) {
    if (page == 'dashboard') {
        if (flag) {
            let sliders = arrayParser.arr3parser(hourly.slice());
            dashboardElements.dashHSlider1().replaceChildren();
            dashboardElements.dashHSlider2().replaceChildren();
            sliders.forEach((x, i) => {
                let t = timeParser.hours24(new Date(x.timestamp));
                let upperCard = dashboardHourlyCardUpper(`${t[0]} ${t[1]}`, x.weatherImage, x.temp);
                let lowerCard = dashboardHourlyCardLower(`${t[0]} ${t[1]}`, '/src/images/weather-icons/direction.png', x.windSpeed, x.windDirection);
                let li1 = document.createElement('li');
                li1.classList.add('slider-item');
                li1.setAttribute('data-info-upper', i);
                render(upperCard, li1);
                dashboardElements.dashHSlider1().appendChild(li1);
                let li2 = document.createElement('li');
                li2.classList.add('slider-item');
                li2.setAttribute('data-info-lower', i);
                render(lowerCard, li2);
                dashboardElements.dashHSlider2().appendChild(li2);
            });
        }
    } else if (page == 'hourly') {
        let root = hourlyElements.articleCtr();
        let temp = document.createElement('div');
        root.setAttribute('id', 'hourly-render');
        root.replaceChildren();
        render(dynamicHourlyTemplate(hourly), temp);
        root.innerHTML = temp.innerHTML;
    }
}





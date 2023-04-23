import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { dashboardElements, daysFull, daysShort, monthsShort, timeParser, valueParser, weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT } from "../util/util.js";
import { getWeather } from "./api.js";

export function applyBlur(element) {
    element.classList.add('blurred');
}

export function removeBlur(element) {
    element.classList.remove('blurred');
}

export function createErrorOverlay(message) { // Content dynamically added via CSS
    let errorOverlay = document.createElement('a');
    errorOverlay.href = '/dashboard';
    errorOverlay.classList.add('error-overlay');
    errorOverlay.textContent = message;
    return errorOverlay;
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

// invoked every 10m by updateWeatherInfo()
export function renderWeather(page, { current, daily, hourly }) {
    renderCurrentWeather(page, current);
    renderDailyWeather(page, daily);
    renderHourlyWeather(page, hourly);
    dashboardElements.lastUpdated().forEach(x => {
        setValue(x, `Last updated: ${timeParser.hours24()[0]}:${timeParser.min()} ${timeParser.hours24()[1]}`);
    });
}

// invokes renderWeather() every 10m
export function updateWeatherInfo(page, { current, daily, hourly }) {
    setInterval(function () {
        renderWeather(page, { current, daily, hourly });
    }, 600000);
}

function setValue(element, value, addin = false) {
    if (!element) return; // prevents errors - continuous func
    element.textContent = value;
    if (addin) render(addin, element); // adjust if necessary
}

function setImage(element, path) {
    if (!element) return; // prevents errors - continuous func
    element.setAttribute('src', path);
}

function updateDashboardTimeNow() { // updates timeNow every second
    setInterval(function () {
        let [hNow, mNow, sNow] = [timeParser.hours24(), timeParser.min(), timeParser.sec()];
        // console.log(sNow);
        if (dashboardElements.highTimeNow()) {
            setValue(dashboardElements.highTimeNow(), `${hNow[0]}:${mNow} ${hNow[1]}`);
        }
    }, 1000);
}

function renderCurrentWeather(page, current) {
    if (page == 'dashboard') {
        // CURRENT CARD
        setImage(dashboardElements.currentImg(), current.weatherImage);
        setValue(dashboardElements.currentTemp(), current.currentTemp, html`&deg;<sup>c</sup>`);
        setValue(dashboardElements.currentText(), current.weatherText);
        setValue(dashboardElements.currentDateDay(), `${current.
            dayLong} ${new Date().getDate()}, ${monthsShort[new Date().getMonth()]}`);
        // TODO HERE - Only London, GB left to change, when I implement search api


        // TODAYS HIGHLIGHTS
        let [hNow, mNow, hRise, mRise, hSet, mSet] = [
            timeParser.hours24(), timeParser.min(),
            timeParser.hours24(new Date(current.sunrise)),
            timeParser.min(new Date(current.sunrise)),
            timeParser.hours24(new Date(current.sunset)),
            timeParser.min(new Date(current.sunset)),
        ];
        setValue(dashboardElements.highTimeNow(), `${hNow[0]}:${mNow} ${hNow[1]}`);
        setValue(dashboardElements.highTimeSunrise(), `${hRise[0]}:${mRise} ${hRise[1]}`);
        setValue(dashboardElements.highTimeSunset(), `${hSet[0]}:${mSet} ${hSet[1]}`);
        updateDashboardTimeNow(); // continuous time update

        setValue(dashboardElements.highFeelsLike(), current.feelsLikeTemp, html`&deg;<sup>c</sup>`);
        setValue(dashboardElements.highWind(), current.windSpeed, html` <sub>m/s</sub>`);
        setValue(dashboardElements.highHumidity(), current.humidity, html` <sub>%</sub>`);
        // the hourly na 3h da go oformq s logika v iznesena funkcia, koqto da 
        // mi vru6ta gotov array sus every 3rd element

    } else if (page == 'hourly') {

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

    }
}

function renderHourlyWeather(page, hourly) {
    if (page == 'dashboard') {

    } else if (page == 'hourly') {

    }
}





// ADD conversion / parser for the times (maybe after checking/filtering)

// maybe add last updated at ${the time of the index=0 element in the hourly array}
// or whenever it was - do the math tomorrow

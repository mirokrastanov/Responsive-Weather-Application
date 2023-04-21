import { weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT } from "../util/util.js";

export function applyBlur(element) {
    element.classList.add('blurred');
}

export function removeBlur(element) {
    element.classList.remove('blurred');
}

export function getCurrentTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function parseCurrentWeather(data) {
    let { current_weather, daily, hourly } = data;

    return {
        currentTemp: Math.round(current_weather.temperature),
        weatherCode: current_weather.weathercode,
        weatherText: weatherCodes[current_weather.weathercode],
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
    }
}
function parseDailyWeather(data) {
    let { daily } = data;

    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            weatherCode: daily.weathercode[index],
            weatherText: weatherCodes[daily.weathercode[index]],
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
        }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
    // filter only the hours from current hour to after 7 days
}

export function getParsedWeatherData(data) {
    let result = {
        raw: data,
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
    };
    result.current.is_day = result.hourly[0].is_day;
    let convertorImgPath = result.current.is_day == 1
        ? weatherImgRoutesDAY[result.current.weatherCode]
        : weatherImgRoutesNIGHT[result.current.weatherCode];
    result.current.weatherImage = convertorImgPath;
    return result;
}

// let testRaw = await getWeather(42.7, 23.32, getCurrentTimeZone());

export function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);
}

function renderCurrentWeather(current) {

}

function renderDailyWeather(daily) {

}

function renderHourlyWeather(hourly) {

}





// ADD conversion / parser for the times (maybe after checking/filtering)

// maybe add last updated at ${the time of the index=0 element in the hourly array}
// or whenever it was - do the math tomorrow

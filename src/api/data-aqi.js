import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser, weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getAQI, getTimeZoneWeather, getWeather, reverseGeolocation } from "./api.js";
import { getCurrentTimeZone } from './data-weather.js';



// currentTemp: Math.round(current_weather.temperature),
// weatherCode: current_weather.weathercode,
// weatherText: weatherCodes[current_weather.weathercode],
// weatherImage: generateImage(current_weather.is_day, current_weather.weathercode),
// feelsLikeTemp: Math.round(hourly.apparent_temperature[0]),
// windSpeed: current_weather.windspeed,
// windDirection: current_weather.winddirection,
// humidity: hourly.relativehumidity_2m[0],
// precip: Math.round(hourly.precipitation[0] * 100) / 100,
// precipProbability: Math.round(hourly.precipitation_probability[0]),
// visibility: Math.round(hourly.visibility[0] * 100) / 100,
// pressure: Math.round(hourly.pressure_msl[0]),
// timeNow: current_weather.time * 1000,
// sunrise: daily.sunrise[0] * 1000,
// sunset: daily.sunset[0] * 1000,
// dayLong: returnDayLONG().format(current_weather.time * 1000),
// dayShort: returnDaySHORT().format(current_weather.time * 1000),


// function parseHourlyWeather(data) {
//     let { hourly, current_weather } = data;

//     return hourly.time.map((time, index) => {
//         return {
//             timestamp: time * 1000,
//             is_day: hourly.is_day[index],
//             weatherCode: hourly.weathercode[index],
//             weatherText: weatherCodes[hourly.weathercode[index]],
//             weatherImage: generateImage(hourly.is_day[index], hourly.weathercode[index]),
//             temp: Math.round(hourly.temperature_2m[index]),
//             feelsLikeTemp: Math.round(hourly.apparent_temperature[index]),
//             precip: Math.round(hourly.precipitation[index] * 100) / 100,
//             precipProbability: Math.round(hourly.precipitation_probability[index]),
//             windSpeed: hourly.windspeed_10m[index],
//             windDirection: hourly.winddirection_10m[index],
//             humidity: hourly.relativehumidity_2m[index],
//             pressure: Math.round(hourly.pressure_msl[index]),
//             visibility: Math.round(hourly.visibility[index] * 100) / 100,
//             cloudCover: hourly.cloudcover[index],
//             hour: returnHour().format(time * 1000),
//             dayLong: returnDayLONG().format(time * 1000),
//             date: new Date(time * 1000).getDate(),
//             monthShort: monthsShort[new Date(time * 1000).getMonth()],
//         }
//     }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000);
//     // filter only the hours from current hour to after 7 days
// }

function parseAQIData(data) {

    return data;
}


export async function getParsedAQIData(coords) {
    // let testRaw = await getAQI(42.7, 23.32, getCurrentTimeZone());
    let data = await getAQI(coords[0], coords[1], getCurrentTimeZone());
    return data;
    // let extraData = await getTimeZoneWeather(coords[0], coords[1]);
    // let locationTimeZone = extraData.data.timezone;
    // let result = {
    //     raw: data,
    //     current: parseCurrentWeather(data),
    //     daily: parseDailyWeather(data),
    //     hourly: parseHourlyWeather(data),
    // };
    // result.current.is_day = result.hourly[0].is_day;
    // result.current.timeZoneGMTdiff = locationTimeZone;
    // return result;
}

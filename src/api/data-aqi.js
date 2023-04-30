import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser,
    weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getAQI, getTimeZoneWeather, getWeather, reverseGeolocation } from "./api.js";
import { getCurrentTimeZone, returnDayLONG, returnHour } from './data-weather.js';


function parseAQIData(data) {
    let { hourly, hourly_units } = data;
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            hour: returnHour().format(time * 1000),
            dayLong: returnDayLONG().format(time * 1000),
            date: new Date(time * 1000).getDate(),
            monthShort: monthsShort[new Date(time * 1000).getMonth()],
            pm2_5: hourly.pm2_5[index],
            // ADD the ALL the AQI DATA like the above line -- TODO
        }
    }).filter(({ timestamp }) => timestamp >= new Date().getTime());
    // filters only the hours from the current hour to after 6 days
}


// i 2ta - getParsedAQI i getParsedWeather da se invoke-vat i na dvata page-a, samo render-a, da
// si e konkreten za teky6tia page
export async function getParsedAQIData(coords) {
    // let testRaw = await getAQI(42.7, 23.32, getCurrentTimeZone());
    let data = await getAQI(coords[0], coords[1], getCurrentTimeZone());
    let parsedData = parseAQIData(data);
    let extraData = await getTimeZoneWeather(coords[0], coords[1]);
    let locationTimeZone = extraData.data.timezone;
    let result = {
        raw: data,
        hourly: parsedData,
        units: data.hourly_units,
    };
    result.timeZoneGMTdiff = locationTimeZone;
    // if time/clock is needed - check 298+ lines from data-weather
    return result;
}

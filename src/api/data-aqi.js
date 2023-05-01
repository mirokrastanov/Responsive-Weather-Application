import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser,
    weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getAQI, getTimeZoneWeather, getWeather, reverseGeolocation } from "./api.js";
import { getCurrentTimeZone, returnDayLONG, returnHour, setValue } from './data-weather.js';


function parseAQIData(data) {
    let { hourly } = data;
    // console.log(data);
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            hour: returnHour().format(time * 1000),
            dayLong: returnDayLONG().format(time * 1000),
            date: new Date(time * 1000).getDate(),
            monthShort: monthsShort[new Date(time * 1000).getMonth()],
            carbon_monoxide: [hourly.carbon_monoxide[index], "μg/m³"],
            dust: [hourly.dust[index], "μg/m³"],
            european_aqi: [hourly.european_aqi[index], "EAQI"],
            nitrogen_dioxide: [hourly.nitrogen_dioxide[index], "μg/m³"],
            ozone: [hourly.ozone[index], "μg/m³"],
            pm2_5: [hourly.pm2_5[index], "μg/m³"],
            pm10: [hourly.pm10[index], "μg/m³"],
            sulphur_dioxide: [hourly.sulphur_dioxide[index], "μg/m³"],
        }
    }).filter(({ timestamp }) => timestamp >= new Date().getTime());
    // filters only the hours from the current hour to after 6 days
}


// i 2ta - getParsedAQI i getParsedWeather da se invoke-vat i na dvata page-a, samo render-a, da
// si e konkreten za teky6tia page
export async function getParsedAQIData(coords) {
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
    return result;
}


export function renderDashboardAQI(page, data) {
    console.log(data);
    const { hourly, units } = data;
    if (page == 'dashboard') {
        // setValue(dashboardElements.highAQIstate(), )

    } else if (page == 'air-quality') {


    }
}
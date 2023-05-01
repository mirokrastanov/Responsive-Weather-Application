import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { touchSlider } from '../util/slider.js';
import {
    aqiParser,
    arrayParser, dashboardElements, daysFull, daysShort,
    elements, hourlyElements, monthsShort, timeParser, valueParser,
    weatherCodes, weatherImgRoutesDAY, weatherImgRoutesNIGHT
} from "../util/util.js";
import { dashboardHourlyCardLower, dashboardHourlyCardUpper, dynamicHourlyTemplate } from '../views/dashboard.js';
import { getAQI, getTimeZoneWeather, getWeather, reverseGeolocation } from "./api.js";
import { getCurrentTimeZone, returnDayLONG, returnHour, setValue } from './data-weather.js';


function generateTitleAndColor(text = 'Good') {
    let obj = {
        'Good': 1,
        'Fair': 2,
        'Moderate': 3,
        'Poor': 4,
        'Very poor': 5,
        'Extremely poor': 6
    };
    let colorObj = {
        c1: '--color-bg-aqi-1',
        c1hover: '--color-bg-aqi-1-hover',
        c1text: '--color-bg-aqi-1-text',
        c2: '--color-bg-aqi-2',
        c2hover: '--color-bg-aqi-2-hover',
        c2text: '--color-bg-aqi-2-text',
        c3: '--color-bg-aqi-3',
        c3hover: '--color-bg-aqi-3-hover',
        c3text: '--color-bg-aqi-3-text',
        c4: '--color-bg-aqi-4',
        c4hover: '--color-bg-aqi-4-hover',
        c4text: '--color-bg-aqi-4-text',
        c5: '--color-bg-aqi-5',
        c5hover: '--color-bg-aqi-5-hover',
        c5text: '--color-bg-aqi-5-text',
        c6: '--color-bg-aqi-6',
        c6hover: '--color-bg-aqi-6-hover',
        c6text: '--color-bg-aqi-6-text',
    };

    let level = aqiParser[obj[text]];
    let title = 'General Population:\n' + level.messageGeneralPop +
        '\n\nSensitive Population:\n' + level.messageSensitivePop;
    let [bg, hover, color] = [
        colorObj[`c${obj[text]}`],
        colorObj[`c${obj[text]}hover`],
        colorObj[`c${obj[text]}text`],
    ];


    return [title, bg, hover, color];
}

function parseAQIData(data) {
    let { hourly } = data;
    // console.log(data);
    let result = hourly.time.map((time, index) => {
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

    result.forEach(hourObject => {
        Object.values(aqiParser).forEach(level => {
            let aqiMAIN = hourObject.european_aqi;
            let pm2_5 = hourObject.pm2_5;
            let pm10 = hourObject.pm10;
            let no2 = hourObject.nitrogen_dioxide;
            let o3 = hourObject.ozone;
            let so2 = hourObject.sulphur_dioxide;
            if (aqiMAIN[0] >= level.rangeEAQI[0] && aqiMAIN[0] < level.rangeEAQI[1]) {
                hourObject.european_aqi.push(level.level);
            }
            if (pm2_5[0] >= level.range_pm2_5[0] && pm2_5[0] < level.range_pm2_5[1]) {
                hourObject.pm2_5.push(level.level);
            }
            if (pm10[0] >= level.range_pm10[0] && pm10[0] < level.range_pm10[1]) {
                hourObject.pm10.push(level.level);
            }
            if (no2[0] >= level.range_no2[0] && no2[0] < level.range_no2[1]) {
                hourObject.nitrogen_dioxide.push(level.level);
            }
            if (o3[0] >= level.range_o3[0] && o3[0] < level.range_o3[1]) {
                hourObject.ozone.push(level.level);
            }
            if (so2[0] >= level.range_so2[0] && so2[0] < level.range_so2[1]) {
                hourObject.sulphur_dioxide.push(level.level);
            }
        });
    });

    result.forEach(hourObject => {
        let res = {
            main: generateTitleAndColor(hourObject.european_aqi[2]),

        };
        let aqi = {
            main: {
                title: res.main[0],
                bg: res.main[1],
                hover: res.main[2],
                color: res.main[3]
            },
        };

        // let pm2_5 = hourObject.pm2_5;
        // let pm10 = hourObject.pm10;
        // let no2 = hourObject.nitrogen_dioxide;
        // let o3 = hourObject.ozone;
        // let so2 = hourObject.sulphur_dioxide;

    });


    return result;
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
        let aqiState = {
            text: data.hourly[0].european_aqi[2],
            title: generateTitleAndColor(data.hourly[0].european_aqi[2])[0],
            bg: generateTitleAndColor(data.hourly[0].european_aqi[2])[1],
            hover: generateTitleAndColor(data.hourly[0].european_aqi[2])[2],
            color: generateTitleAndColor(data.hourly[0].european_aqi[2])[3],
        };
        setValue(dashboardElements.highAQIstate(),
            aqiState.text, false, [['title', aqiState.title],
            ['style', `background-color:var(${aqiState.bg});color:var(${aqiState.color});`],
            ['data-hover', aqiState.hover]]);

    } else if (page == 'air-quality') {


    }
}
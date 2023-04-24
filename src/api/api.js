import { dashboardElements, weatherCodes } from "../util/util.js";

// latitude , longitude & timezone ==> added dynamically
export async function getWeather(lat, lon, timezone) {
    let res = await axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&windspeed_unit=ms&timeformat=unixtime', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    });
    let data = await res.data;

    return data;
}


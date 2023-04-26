import { apiKey } from "../_private/api-private.js";
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


// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
export async function getGeolocation(searched) {
    // city | city, country | city, state(US), country | 
    let res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searched}&limit=5&appid=${apiKey}`);
    let data = await res; // returns JSON straight away

    return data;
}


// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
export async function reverseGeolocation(lat, lon) {
    // lat | lon
    let res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`);
    let data = await res;

    return data;
}

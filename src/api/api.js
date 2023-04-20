import { weatherCodes } from "../util/util.js";

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,visibility,windspeed_10mdaily=weathercode,sunrise,sunset,precipitation_sum&current_weather=true&timeformat=unixtime


// latitude , longitude & timezone ==> added dynamically

export async function getWeather(lat, lon, timezone) {
    let res = await axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,visibility,windspeed_10m&daily=weathercode,sunrise,sunset,precipitation_sum&current_weather=true&timeformat=unixtime', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    });
    let data = await res.data;
    console.log(parseCurrentWeather(data));
    return data;
    // return {
    //     current: parseCurrentWeather(data),
    //     current: parseDailyWeather(data),
    //     current: parseHourlyWeather(data),
    // }
}

function parseCurrentWeather(data) {
    let { current_weather, daily, daily_units, hourly, hourly_units } = data;


    let result = {
        currentTemp: Math.round(current_weather.temperature),
        weatherCode: current_weather.weathercode, // returns a number - get the info from open-meteo's DOCS + associate a function to attach an image for each
        feelsLikeTemp: Math.round(hourly.apparent_temperature[0]),
        windSpeed: current_weather.windspeed,
        humidity: hourly.relativehumidity_2m[0],
        precip: Math.round(hourly.precipitation[0] * 100) / 100,
        precipProbability: hourly.precipitation_probability[0],
        visibility: hourly.visibility[0],
        pressure: hourly.pressure_msl[0],
        timeNow: current_weather.time,
        sunrise: daily.sunrise[0],
        sunset: daily.sunset[0],
    }
    return result;
}
function parseDailyWeather(data) {

}
function parseHourlyWeather(data) {

}
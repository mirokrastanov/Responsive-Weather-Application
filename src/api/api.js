import { weatherCodes } from "../util/util.js";

// https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&windspeed_unit=ms&timeformat=unixtime


// latitude , longitude & timezone ==> added dynamically

export async function getWeather(lat, lon, timezone) {
    let res = await axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max&current_weather=true&windspeed_unit=ms&timeformat=unixtime', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    });
    let data = await res.data;

    return data;
    // return {
    //     current: parseCurrentWeather(data),
    //     daily: parseDailyWeather(data),
    //     hourly: parseHourlyWeather(data),
    // }
}

function parseCurrentWeather(data) {
    let { current_weather, daily, hourly } = data;

    return {
        currentTemp: Math.round(current_weather.temperature),
        weatherCode: current_weather.weathercode,
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
            temp: Math.round(daily.apparent_temperature_max[index]),
        }
    });

}
function parseHourlyWeather(data) {
    let { hourly } = data;

    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            weatherCode: hourly.weathercode[index],
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
    });
}


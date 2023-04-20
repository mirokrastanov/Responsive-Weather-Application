import { weatherCodes } from "../util/util.js";

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
    let { hourly } = data;

    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
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
    });
}

export function getParsedWeatherData(data) {
    return {
        raw: data,
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
    }
}
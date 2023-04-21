export const navElements = [
    document.querySelector('#page-logo'),
    document.querySelector('header nav a:nth-of-type(2)'),
    document.querySelector('header nav a:nth-of-type(3)'),
    document.querySelector('header nav a:nth-of-type(4)')
];

export const daysFull = [
    'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const daysShort = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

export const monthsFull = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const monthsShort = {
    0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
    6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
};

export const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

export const weatherImgRoutesDAY = {
    0: '/src/images/weather-icons/01d.png',
    1: '/src/images/weather-icons/02d.png',
    2: '/src/images/weather-icons/03d.png',
    3: '/src/images/weather-icons/04d.png',
    45: '/src/images/weather-icons/50d.png',
    48: '/src/images/weather-icons/50d.png',
    51: '/src/images/weather-icons/09d.png',
    53: '/src/images/weather-icons/09d.png',
    55: '/src/images/weather-icons/09d.png',
    56: '/src/images/weather-icons/09d.png',
    57: '/src/images/weather-icons/09d.png',
    61: '/src/images/weather-icons/09d.png',
    63: '/src/images/weather-icons/09d.png',
    65: '/src/images/weather-icons/09d.png',
    66: '/src/images/weather-icons/09d.png',
    67: '/src/images/weather-icons/09d.png',
    71: '/src/images/weather-icons/13d.png',
    73: '/src/images/weather-icons/13d.png',
    75: '/src/images/weather-icons/13d.png',
    77: '/src/images/weather-icons/13d.png',
    80: '/src/images/weather-icons/10d.png',
    81: '/src/images/weather-icons/10d.png',
    82: '/src/images/weather-icons/10d.png',
    85: '/src/images/weather-icons/13d.png',
    86: '/src/images/weather-icons/13d.png',
    95: '/src/images/weather-icons/11d.png',
    96: '/src/images/weather-icons/11d.png',
    99: '/src/images/weather-icons/11d.png',
};

export const weatherImgRoutesNIGHT = {
    0: '/src/images/weather-icons/01n.png',
    1: '/src/images/weather-icons/02n.png',
    2: '/src/images/weather-icons/03n.png',
    3: '/src/images/weather-icons/04n.png',
    45: '/src/images/weather-icons/50n.png',
    48: '/src/images/weather-icons/50n.png',
    51: '/src/images/weather-icons/09n.png',
    53: '/src/images/weather-icons/09n.png',
    55: '/src/images/weather-icons/09n.png',
    56: '/src/images/weather-icons/09n.png',
    57: '/src/images/weather-icons/09n.png',
    61: '/src/images/weather-icons/09n.png',
    63: '/src/images/weather-icons/09n.png',
    65: '/src/images/weather-icons/09n.png',
    66: '/src/images/weather-icons/09n.png',
    67: '/src/images/weather-icons/09n.png',
    71: '/src/images/weather-icons/13n.png',
    73: '/src/images/weather-icons/13n.png',
    75: '/src/images/weather-icons/13n.png',
    77: '/src/images/weather-icons/13n.png',
    80: '/src/images/weather-icons/10n.png',
    81: '/src/images/weather-icons/10n.png',
    82: '/src/images/weather-icons/10n.png',
    85: '/src/images/weather-icons/13n.png',
    86: '/src/images/weather-icons/13n.png',
    95: '/src/images/weather-icons/11n.png',
    96: '/src/images/weather-icons/11n.png',
    99: '/src/images/weather-icons/11n.png',
};

export const elements = {
    // get it each time -> invoke on reuse
    main: () => document.querySelector('#main #main-ctr main'),
    mainCtr: () => document.querySelector('#main-ctr'),
    body: () => document.querySelector('body'),
    dotHeader: () => document.querySelector('.header'),
};

export const dashboardElements = {
    currentImg: () => document.querySelector('.current-weather .weapper img'),
    currentTemp: () => document.querySelector('.current-weather .weapper .heading'),
    currentText: () => document.querySelector('.current-weather .body-3'),
    currentDateDay: () => document.querySelector('.current-weather .meta-list .meta-item .meta-text'),

};

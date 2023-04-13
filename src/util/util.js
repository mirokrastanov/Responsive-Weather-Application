

export const elements = [
    document.querySelector('#page-logo'),
    document.querySelector('header nav div:nth-of-type(1)'),
    document.querySelector('header nav div:nth-of-type(2)'),
    document.querySelector('header nav div:nth-of-type(3)')
];

export const routes = {
    '/': ['/', elements[0]],
    '/home': ['/home', elements[0]],
    '/index.html': ['/index.html', elements[0]],
    '/dashboard': ['/dashboard', elements[1], 'div'],
    '/air-quality': ['/air-quality', elements[2], 'div'],
    '/about': ['/about', elements[3], 'div'],
};

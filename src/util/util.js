export const elements = [
    document.querySelector('#page-logo'),
    document.querySelector('header nav a:nth-of-type(2)'),
    document.querySelector('header nav a:nth-of-type(3)'),
    document.querySelector('header nav a:nth-of-type(4)')
];

export const routes = {
    '/': ['/', elements[0]],
    '/home': ['/home', elements[0]],
    '/index.html': ['/index.html', elements[0]],
    '/dashboard': ['/dashboard', elements[1], 'div'],
    '/air-quality': ['/air-quality', elements[2], 'div'],
    '/about': ['/about', elements[3], 'div'],
};

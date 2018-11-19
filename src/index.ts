import * as React from 'react';

import { startup } from './scripts';

const rootElement = window.document.getElementById('root');

startup(rootElement);

if (module.hot) {
    module.hot.accept(['./scripts'], () => {
        const nextStartup = require('./scripts').startup;
        nextStartup(rootElement);
    });
}

if (process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/static/service-worker.js')
            .then(registration => {
                console.info('SW registered: ', registration);
            }).catch(registrationError => {
                console.info('SW registration failed: ', registrationError);
            });
    });
} else {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React, {
        exclude: /^(Route|Switch|styled)/
    });
}
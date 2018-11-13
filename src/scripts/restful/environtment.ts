import { setupEnvironment, Store } from 'react-restful';

import { AntdNotification } from '@/components';
import { getToken } from '@/utilities';

import { FormikFactory } from './form';
import { customFetch } from './utils';

const environment = setupEnvironment({
    fetchMethod: customFetch,
    entry: API_ENTRY,
    store: new Store(),
    requestBodyParser: (key, value) => {
        if (
            value &&
            value.hasOwnProperty('toISOString') &&
            typeof value.toISOString === 'function'
        ) {
            return value.toISOString();
        }

        return value;
    },
    beforeFetch: (url: string, requestInit: RequestInit) => {
        const token = getToken();

        if (requestInit.headers instanceof Headers) {
            if (token) {
                requestInit.headers.append('Authorization', `Bearer ${token}`);
            }
        }

        return requestInit;
    },
    afterFetch: async (requestInfo) => {
        const { response } = requestInfo;

        if (response.ok || response.status === 401) {
            return;
        }

        let error;
        try {
            error = await response.json();
        } catch (error) {
            error = await response.text();
        }

        AntdNotification.info({
            message: 'Fetch error!',
            description: response.statusText,
        });

        console.error(error);
    }
});

export const request = environment.request;

export const formFactory = new FormikFactory({
    request: request
});
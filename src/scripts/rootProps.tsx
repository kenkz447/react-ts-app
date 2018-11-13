import { createBrowserHistory } from 'history';
import * as jwtDecode from 'jwt-decode';
import * as React from 'react';

import { RootProps } from './app';
import { loginPath } from './configs';
import {
    AuthClient,
    Authentication,
    ContextFetcher,
    DecodedJWT,
    LoadingBar
} from './domain';
import { LocalLoginResponseBody, User, userResources } from './restful';
import { RouterRoot } from './routes';

const browserHistory = createBrowserHistory();

const authClient = new AuthClient<User>({
    history: browserHistory,
    loginPath: loginPath,
    getUserResource: userResources.findOne,
    getUserEquestParams: (token) => {
        const userInfo: DecodedJWT = jwtDecode(token);
        return {
            type: 'path',
            parameter: 'id',
            value: userInfo._id
        };
    },
    getResponseToken: (response: LocalLoginResponseBody) => response.jwt,
    getCookiesOption: (token) => {
        const userInfo: DecodedJWT = jwtDecode(token);
        const now = new Date();
        const timeNow = now.getTime();
        return {
            expires: new Date(timeNow + userInfo.exp)
        };
    },
});

const AppContent = () => (
    <Authentication authClient={authClient}>
        <ContextFetcher>
            <RouterRoot />
            <LoadingBar />
        </ContextFetcher>
    </Authentication>
);

const initialContext = {
    history: browserHistory
};

export const getRootProps = (): RootProps => ({
    AppContent: AppContent,
    initialContext: initialContext
});
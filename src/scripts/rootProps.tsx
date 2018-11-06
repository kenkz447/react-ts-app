import { createBrowserHistory } from 'history';
import * as jwtDecode from 'jwt-decode';
import * as React from 'react';

import { AuthClientBase, RootProps } from './app';
import { loginPath } from './configs';
import { Authentication, ContextFetcher, DecodedJWT } from './domain';
import { TokenResponseBody, userResources } from './restful';
import { RouterRoot } from './routes';

const browserHistory = createBrowserHistory();

const AppContent = () => (
    <Authentication>
        <ContextFetcher>
            <RouterRoot />
        </ContextFetcher>
    </Authentication>
);

const initialContext = {
    history: browserHistory,
    authClient: new AuthClientBase({
        history: browserHistory,
        loginPath: loginPath,
        getUserResource: userResources.getById,
        getUserEquestParams: (token) => {
            const userInfo: DecodedJWT = jwtDecode(token);
            return {
                type: 'path',
                parameter: 'id',
                value: userInfo.sub
            };
        },
        getResponseToken: (response: TokenResponseBody) => response.token,
        getTokenCookiesOption: (token) => {
            const userInfo: DecodedJWT = jwtDecode(token);
            const now = new Date();
            const timeNow = now.getTime();
            return {
                expires: new Date(timeNow + userInfo.exp)
            };
        },
    })
};

export const getRootProps = (): RootProps => ({
    AppContent: AppContent,
    initialContext: initialContext
});
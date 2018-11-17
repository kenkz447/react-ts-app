import { createBrowserHistory } from 'history';
import * as jwtDecode from 'jwt-decode';
import * as React from 'react';

import { AppCoreContext, RootProps } from './app';
import { loginPath } from './configs';
import {
    AuthClient,
    Authentication,
    ContextFetcher,
    DecodedJWT,
    LoadingBar,
    policies
} from './domain';
import { LocalLoginResponseBody, User, userResources } from './restful';
import { RouterRoot } from './routes';

const browserHistory = createBrowserHistory();

const authClient = new AuthClient<User>({
    history: browserHistory,
    loginPath: loginPath,
    getUserResource: userResources.me,
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

const initialContext: Partial<AppCoreContext> = {
    history: browserHistory,
    policies: policies
};

export const getRootProps = (): RootProps => ({
    AppContent: AppContent,
    initialContext: initialContext
});
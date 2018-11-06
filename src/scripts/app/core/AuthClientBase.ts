// tslint:disable:no-any
import { History } from 'history';
import { RequestParameter, Resource } from 'react-restful';

import { request } from '@/restful';
import {
    clearToken,
    CookiesOption,
    getToken,
    getUrlSearchParam,
    redirect,
    saveToken
} from '@/utilities';

interface AuthClientProps {
    readonly loginPath: string;
    readonly history: History;
    readonly getResponseToken: (response: any) => string;
    readonly getTokenCookiesOption?: (token: string, response: any) => CookiesOption;
    readonly getUserResource: Resource<{}>;
    readonly getUserEquestParams?: (token: string) => RequestParameter | RequestParameter[];
}

export class AuthClientBase<User> {
    static readonly authInstance = Symbol();

    readonly props: AuthClientProps;

    constructor(props: AuthClientProps) {
        this.props = props;
    }

    async getLoggedInUser() {
        const { getUserResource, getUserEquestParams } = this.props;

        const storedToken = getToken();
        if (!storedToken) {
            throw 'No local token found, login now!';
        }

        try {
            const requestParams = getUserEquestParams && getUserEquestParams(storedToken);
            const user: User = await request(
                getUserResource,
                requestParams
            );

            return user;
        } catch (error) {
            if (error instanceof Response) {
                if (error.status === 401) {
                    clearToken();
                }
            }

            throw 'Token invalid or expried, login again!';
        }
    }

    async login(resource: Resource<{}>, requestBody: {}) {
        const { getResponseToken, getTokenCookiesOption } = this.props;
        try {
            const response = await request(
                resource,
                {
                    type: 'body',
                    value: requestBody
                }
            );

            const token = getResponseToken(response);
            const tokenCookiesOption = getTokenCookiesOption && getTokenCookiesOption(token, response);
            saveToken(token, tokenCookiesOption);

            const returnUrlParam = getUrlSearchParam('returnUrl');
            const returnPath = returnUrlParam ? returnUrlParam : '/';

            redirect(returnPath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    readonly logout = () => {
        const { history, loginPath } = this.props;
        clearToken();
        history.replace(loginPath);
    }

    readonly gotoLoginPage = this.logout;
}
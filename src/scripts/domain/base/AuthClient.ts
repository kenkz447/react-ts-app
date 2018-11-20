// tslint:disable:no-any
import { History } from 'history';
import { RequestParameter, Resource } from 'react-restful';

import { LocalLoginResponseBody, request } from '@/restful';
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
    readonly getCookiesOption?: (token: string, response: any) => CookiesOption;
    readonly getUserResource: Resource<{}>;
    readonly getUserEquestParams?: (token: string) => RequestParameter | RequestParameter[];
}

export class AuthClient<User> {
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

    readonly signIn = (loginResponse: LocalLoginResponseBody) => {
        const { getResponseToken, getCookiesOption } = this.props;
        try {

            const token = getResponseToken(loginResponse);
            const tokenCookiesOption = getCookiesOption && getCookiesOption(token, loginResponse);
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
        const { loginPath } = this.props;
        clearToken();
        location.href = loginPath;
    }

    readonly gotoLoginPage = this.logout;
}
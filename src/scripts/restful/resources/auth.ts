import { Resource } from 'react-restful';

import { User } from './user';

export interface TokenRequestBody {
    readonly identifier: string;
    readonly password: string;
    readonly rememberMe: boolean;
}

export interface TokenResponseBody {
    readonly jwt: string;
    readonly user: User;
}

export const authResources = {
    local: new Resource<TokenResponseBody>({
        url: '/auth/local',
        method: 'POST'
    }),
    forgotPassword: new Resource({
        url: '/auth/forgot-password',
        method: 'POST'
    }),
    resetPassword: new Resource({
        url: '/auth/reset-password',
        method: 'POST'
    })
};
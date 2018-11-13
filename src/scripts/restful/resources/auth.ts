import { Resource } from 'react-restful';

import { User } from './user';

export interface LocalLoginRequestBody {
    readonly identifier: string;
    readonly password: string;
    readonly rememberMe: boolean;
}

export interface LocalLoginResponseBody {
    readonly jwt: string;
    readonly user: User;
}

export interface ForgotPasswordRequestBody {
    readonly email: string;
    readonly url: string;
}

export interface ResetPasswordRequestBody {
    readonly code: string;
    readonly password: string;
    readonly passwordConfirmation: string;
}

export const authResources = {
    local: new Resource<LocalLoginResponseBody>({
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
import { Resource } from 'react-restful';

export interface TokenRequestBody {
    readonly username: string;
    readonly password: string;
    readonly grantType: string;
    readonly refreshToken: string;
}

export interface TokenResponseBody {
    readonly token: string;
    readonly expTokenDate: number;
    readonly expRefreshTokenDate: number;
    readonly refreshToken: string;
}

export const tokenResources = {
    create: new Resource<TokenResponseBody>({
        url: '/auth/api/create-token',
        method: 'POST'
    })
};
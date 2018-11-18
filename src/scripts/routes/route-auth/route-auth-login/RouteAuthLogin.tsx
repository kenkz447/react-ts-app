import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageWrapper } from '@/components';
import { loginPath } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';

import { LoginPageContainer } from './containers';

type RouteAuthLoginProps = AppPageProps;

export class RouteAuthLogin extends RoutePage<RouteAuthLoginProps> {
    static readonly routeInfo: RouteInfo = {
        path: loginPath,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <PageWrapper
                className="child-centered"
                backgroundColor="#f0f2f5"
            >
                <LoginPageContainer />
            </PageWrapper>
        );
    }
}
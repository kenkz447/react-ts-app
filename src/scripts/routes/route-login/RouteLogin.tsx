import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageBase, PageWrapper } from '@/components';
import { loginPath } from '@/configs';
import { AppPageProps } from '@/domain';

import { LoginPageContainer } from './containers';

type RouteLoginProps = AppPageProps;

export class RouteLogin extends PageBase<RouteLoginProps> {

    static readonly routeInfo: RouteInfo = {
        path: loginPath,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <PageWrapper>
                <LoginPageContainer />
            </PageWrapper>
        );
    }
}
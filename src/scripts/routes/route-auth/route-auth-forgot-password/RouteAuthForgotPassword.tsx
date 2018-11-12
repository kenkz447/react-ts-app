import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageBase, PageWrapper } from '@/components';
import { forgotPasswordPath } from '@/configs';
import { AppPageProps } from '@/domain';

import { ForgotPasswordPageContainer } from './containers';

type RouteAuthForgotPasswordProps = AppPageProps;

export class RouteAuthForgotPassword extends PageBase<RouteAuthForgotPasswordProps> {
    static readonly routeInfo: RouteInfo = {
        path: forgotPasswordPath,
        title: 'Đăng nhập',
        exact: true
    };

    render() {
        return (
            <PageWrapper
                className="child-centered"
                backgroundColor="#f0f2f5"
            >
                <ForgotPasswordPageContainer />
            </PageWrapper>
        );
    }
}
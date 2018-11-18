import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageWrapper } from '@/components';
import { resetPasswordPath } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { text } from '@/i18n';

import { ResetPasswordPageContainer } from './containers';

export class RouteAuthResetPassword extends RoutePage<AppPageProps> {
    static readonly routeInfo: RouteInfo = {
        path: resetPasswordPath,
        title: text('Đăng nhập'),
        exact: true
    };

    render() {
        return (
            <PageWrapper
                className="child-centered"
                backgroundColor="#f0f2f5"
            >
                <ResetPasswordPageContainer />
            </PageWrapper>
        );
    }
}
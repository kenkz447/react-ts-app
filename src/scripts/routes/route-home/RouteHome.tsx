import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageBase, PageWrapper } from '@/components';
import { AppPageProps } from '@/domain';

type RouteHomeProps = AppPageProps;

export class RouteHome extends PageBase<RouteHomeProps> {
    static readonly routeInfo: RouteInfo = {
        path: '/',
        title: 'Tổng quan',
        exact: true,
        isActive: () => {
            const { routeInfo } = RouteHome;
            const currentPath = window.location.pathname;
            return currentPath === routeInfo.path;
        }
    };

    render() {
        return (
            <PageWrapper>
                Welcome to Home page!
            </PageWrapper>
        );
    }
}
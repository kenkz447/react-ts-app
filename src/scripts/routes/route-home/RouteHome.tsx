import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageWrapper } from '@/components';
import { DASHBOARD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';

type RouteHomeProps = AppPageProps;

export class RouteHome extends RoutePage<RouteHomeProps> {
    static readonly routeInfo: RouteInfo = {
        path: DASHBOARD_URL,
        title: 'Tổng quan',
        exact: true,
        policies: [isRoot]
    };

    render() {
        return (
            <PageWrapper>
                Welcome to Home page!
            </PageWrapper>
        );
    }
}
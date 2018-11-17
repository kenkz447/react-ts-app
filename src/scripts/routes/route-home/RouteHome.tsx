import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageBase, PageWrapper } from '@/components';
import { AppPageProps } from '@/domain';
import { isRoot } from '@/domain/policies';

type RouteHomeProps = AppPageProps;

export class RouteHome extends PageBase<RouteHomeProps> {
    static readonly routeInfo: RouteInfo = {
        path: '/',
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
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageBase, PageWrapper } from '@/components';
import { AppPageProps, DomainContext } from '@/domain';

type RouteProfileProps = AppPageProps & Pick<DomainContext, 'currentUser'>;

export class RouteProfile extends PageBase<RouteProfileProps> {
    static readonly withContext: Array<keyof DomainContext> = ['currentUser'];

    static readonly routeInfo: RouteInfo = {
        path: '/profile',
        title: 'Profile',
        exact: true,
        isActive: () => {
            const { routeInfo } = RouteProfile;
            const currentPath = window.location.pathname;
            return currentPath === routeInfo.path;
        }
    };

    render() {
        return (
            <PageWrapper>
                Profile Page
            </PageWrapper>
        );
    }
}
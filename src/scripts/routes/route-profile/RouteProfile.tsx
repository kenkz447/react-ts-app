import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageWrapper } from '@/components';
import { USER_PROFILE_URL } from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';

type RouteProfileProps = AppPageProps & Pick<DomainContext, 'currentUser'>;

export class RouteProfile extends RoutePage<RouteProfileProps> {
    static readonly withContext: Array<keyof DomainContext> = ['currentUser'];

    static readonly routeInfo: RouteInfo = {
        path: USER_PROFILE_URL,
        title: 'Profile',
        exact: true,
        policies: ['isRoot']
    };

    render() {
        return (
            <PageWrapper>
                Profile Page
            </PageWrapper>
        );
    }
}
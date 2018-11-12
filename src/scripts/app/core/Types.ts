import { History } from 'history';
import { RouteProps } from 'react-router';

import { AppCoreContext } from '@/app';

export interface AppCoreContext<U = {}> {
    readonly currentUser: U;
    readonly history: History;
    readonly appState?: 'LOADING' | 'READY';
}

export interface RouteInfo extends RouteProps {
    readonly path: string;
    readonly title: string;
    readonly icon?: JSX.Element;
    readonly isActive?: () => boolean;
}

export interface PageProps {
    readonly routeInfo: RouteInfo;
}
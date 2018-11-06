// tslint:disable:no-any
import { History } from 'history';
import { RouteProps } from 'react-router';

import { AppCoreContext } from '@/app';

import { AuthClientBase } from './AuthClientBase';

export interface AppCoreContext<U = {}> {
    readonly authClient: AuthClientBase<U>;
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
import { History } from 'history';
import { RouteProps } from 'react-router';

import { AppCoreContext } from '@/app';

export type Policy = (context: {}) => boolean;

export interface AppCoreContext<U = {}> {
    readonly currentUser: U;
    readonly history: History;
    readonly appState?: 'LOADING' | 'READY';
    readonly policies?: { readonly [key: string]: Policy };
}

export interface RouteInfo extends RouteProps {
    readonly path: string;
    readonly title: string;
    readonly icon?: JSX.Element;
    readonly policies?: string[] | Policy[];
    readonly isActive?: () => boolean;
}

export interface PageProps {
    readonly routeInfo: RouteInfo;
}
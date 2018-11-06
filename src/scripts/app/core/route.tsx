import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Route, RouteComponentProps } from 'react-router-dom';

import { PageProps, RouteInfo } from './Types';

type PageContructor = {
    readonly withContext?: Array<string>;
    readonly routeInfo: RouteInfo;
};

export type AppRouteComponentProps<T> = RouteComponentProps<T>;

type AppRouteComponent = React.ComponentType<WithContextProps<{}, PageProps>> & PageContructor;

export const route = (Component: AppRouteComponent) => {
    if (!Component.routeInfo) {
        throw Error('Default Props with routeProps needed in Route Component!');
    }

    const routeProps = Component.routeInfo;
    const initialContext = Component.withContext || [];

    const WithContextInject = withContext(...initialContext)(Component);

    return (
        <Route key={routeProps.path} {...routeProps} component={WithContextInject} />
    );
};

export const routeFrom = (Components: AppRouteComponent[]) => Components.reduce(
    (currenValue: JSX.Element[], Component) => {
        return [...currenValue, route(Component)];
    },
    []
);
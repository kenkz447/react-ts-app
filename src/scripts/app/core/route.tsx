import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Redirect, Route } from 'react-router-dom';

import AccessControl from './AccessControl';
import { PageProps, RouteInfo } from './Types';

type PageContructor = {
    readonly withContext?: Array<string>;
    readonly routeInfo: RouteInfo;
};

type AppRouteComponent = React.ComponentType<WithContextProps<{}, PageProps>> & PageContructor;

export const route = (Component: AppRouteComponent) => {
    if (!Component.routeInfo) {
        throw Error('Default Props with routeProps needed in Route Component!');
    }

    const routeProps = Component.routeInfo;
    const initialContext = Component.withContext || [];

    const WithContextInject = withContext(...initialContext)(Component);

    if (routeProps.policies) {
        return (
            <Route key={routeProps.path} {...routeProps}>
                {
                    (componentProps) => {
                        return (
                            <AccessControl allowFor={routeProps.policies!}>
                                {(canAccess) => {
                                    if (!canAccess) {
                                        return <Redirect to="/access-deny" />;
                                    }

                                    return <WithContextInject {...componentProps} />;
                                }}
                            </AccessControl>
                        );
                    }
                }
            </Route>
        );
    }

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
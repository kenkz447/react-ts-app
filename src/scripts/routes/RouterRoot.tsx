import './RouterRoot.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Route, Router, Switch } from 'react-router';

import { routeFrom } from '@/app';
import { DomainContext } from '@/domain';
import { DefaultLayout } from '@/layout';

import { RouteHome } from './route-home';
import { RouteLogin } from './route-login';
import { RouteProfile } from './route-profile';

const noLayoutRoutes = routeFrom([
    RouteLogin
]);

const mainRoutes = routeFrom([
    RouteHome,
    RouteProfile
]);

type RouterRootContextProps =
    Pick<DomainContext, 'history'> &
    Pick<DomainContext, 'appState'>;

type RouterRootProps = WithContextProps<RouterRootContextProps>;

class RouterRoot extends React.PureComponent<RouterRootProps> {
    public render() {
        const { history } = this.props;

        return (
            <Router history={history}>
                <Switch>
                    {noLayoutRoutes}
                    <Route path="/">
                        {this.mainRouteComponent}
                    </Route>
                </Switch>
            </Router>
        );
    }

    readonly mainRouteComponent = ({ location }) => {
        const { appState } = this.props;
        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout>
                <Switch location={location}>
                    {mainRoutes}
                    <Route render={() => 'Page not found!'} />
                </Switch>
            </DefaultLayout >
        );
    }
}

export default withContext<DomainContext>('history', 'appState')(RouterRoot); 
import 'antd/dist/antd.less';
import './RouterRoot.scss';

import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import { Route, Router, Switch } from 'react-router';

import { routeFrom } from '@/app';
import { DomainContext } from '@/domain';
import { BlankLayout, DefaultLayout } from '@/layout';

import authRoutes from './route-auth';
import { RouteHome } from './route-home';
import { RouteProfile } from './route-profile';
import { RouteTopicDetail, RouteTopicList, RouteTopicNew } from './route-topic';

const mainRoutes = routeFrom([
    RouteHome,
    RouteTopicList,
    RouteTopicNew,
    RouteTopicDetail,
    RouteProfile
]);

type RouterRootContextProps =
    Pick<DomainContext, 'currentBreakpoint'> &
    Pick<DomainContext, 'history'> &
    Pick<DomainContext, 'appState'>;

type RouterRootProps = WithContextProps<RouterRootContextProps>;

class RouterRoot extends React.PureComponent<RouterRootProps> {
    public render() {
        const { history } = this.props;

        return (
            <Router history={history}>
                <Switch>
                    <Route path="/auth">
                        <BlankLayout>
                            {authRoutes}
                        </BlankLayout>
                    </Route>
                    <Route path="/">
                        {this.mainRouteComponent}
                    </Route>
                </Switch>
            </Router>
        );
    }

    readonly mainRouteComponent = ({ location }) => {
        const { appState, history, currentBreakpoint } = this.props;
        if (appState !== 'READY') {
            return null;
        }

        return (
            <DefaultLayout history={history} currentBreakpoint={currentBreakpoint}>
                <Switch location={location}>
                    {mainRoutes}
                    <Route render={() => 'Page not found!'} />
                </Switch>
            </DefaultLayout >
        );
    }
}

export default withContext<DomainContext>('history', 'appState', 'currentBreakpoint')(RouterRoot); 
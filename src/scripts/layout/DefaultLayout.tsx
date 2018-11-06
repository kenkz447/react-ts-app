import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { RouteInfo } from '@/app';
import { AntdDivider } from '@/components';
import { RouteHome } from '@/routes/route-home';
import { RouteProfile } from '@/routes/route-profile';

const menuItems: RouteInfo[] = [
    RouteHome.routeInfo,
    RouteProfile.routeInfo
];

const DefaultLayoutWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const DefaultLayoutContent = styled.div`
    flex-grow: 1;
    position: relative;
`;

interface DefaultLayoutProps {
}

export class DefaultLayout extends React.Component<DefaultLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <DefaultLayoutWrapper>
                <ul style={{ marginTop: 15 }}>
                    {
                        menuItems.map(o => (
                            <li key={o.path}>
                                <NavLink to={o.path}>
                                    {o.title}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <AntdDivider />
                <DefaultLayoutContent>
                    {children}
                </DefaultLayoutContent>
            </DefaultLayoutWrapper>
        );
    }
}
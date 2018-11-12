import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { RouteInfo } from '@/app';
import { AntdDivider } from '@/components';
import { AntdLayout } from '@/components/antd/AntdLayout';
import { RouteHome } from '@/routes/route-home';
import { RouteProfile } from '@/routes/route-profile';

const menuItems: RouteInfo[] = [
    RouteHome.routeInfo,
    RouteProfile.routeInfo
];

const BlankLayoutWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const BlankLayoutContent = styled.div`
    flex-grow: 1;
    position: relative;
`;

interface BlankLayoutProps {
}

export class BlankLayout extends React.Component<BlankLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <BlankLayoutWrapper>
                <AntdLayout>
                    <AntdLayout.Content className="display-flex">
                        <BlankLayoutContent>
                            {children}
                        </BlankLayoutContent>
                    </AntdLayout.Content>
                    <AntdLayout.Footer style={{ textAlign: 'center' }}>
                        {`Create with ❤️ by Kenkz447`}
                    </AntdLayout.Footer>
                </AntdLayout>
            </BlankLayoutWrapper>
        );
    }
}
import { SiderProps } from 'antd/lib/layout';
import * as React from 'react';

import { AntdIcon, AntdLayout } from '@/components';

export interface DefaultLayoutDesktopProps {
    readonly header: JSX.Element;
    readonly children: JSX.Element;
    readonly footer: JSX.Element;
    readonly siderProps: SiderProps;
}

export const DefaultLayoutDesktop = React.memo((props: DefaultLayoutDesktopProps) => {
    const [siderCollapsed, setSiderCollapsed] = React.useState(false);

    const { siderProps, children, footer, header } = props;
    return (
        <AntdLayout style={{ minHeight: '100vh' }}>
            <AntdLayout.Sider
                {...siderProps}
                collapsed={siderCollapsed}
            />
            <AntdLayout>
                <AntdLayout.Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AntdIcon
                            className="sider-trigger"
                            type={siderProps.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => setSiderCollapsed(!siderCollapsed)}
                        />
                        {header}
                    </div>
                </AntdLayout.Header>
                <AntdLayout.Content>
                    {children}
                </AntdLayout.Content>
                <AntdLayout.Footer style={{ textAlign: 'center' }}>
                    {footer}
                </AntdLayout.Footer>
            </AntdLayout>
        </AntdLayout>
    );
});
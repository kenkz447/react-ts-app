import { Icon, Layout } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import * as React from 'react';

export interface DefaultLayoutDesktopProps {
    readonly header: JSX.Element;
    readonly children: JSX.Element;
    readonly siderProps: SiderProps;
}

export const DefaultLayoutDesktop = React.memo((props: DefaultLayoutDesktopProps) => {
    const [siderCollapsed, setSiderCollapsed] = React.useState(false);

    const { siderProps, children, header } = props;
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider
                {...siderProps}
                collapsed={siderCollapsed}
            />
            <Layout>
                <Layout.Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Icon
                            className="sider-trigger"
                            type={siderProps.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => setSiderCollapsed(!siderCollapsed)}
                        />
                        {header}
                    </div>
                </Layout.Header>
                <Layout.Content>
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
});
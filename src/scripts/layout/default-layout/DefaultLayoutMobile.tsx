import { SiderProps } from 'antd/lib/layout';
import { UnregisterCallback } from 'history';
import * as React from 'react';

import { AntdDrawer, AntdIcon, AntdLayout } from '@/components';
import { WithHistory } from '@/domain';

export interface DefaultLayoutMobileProps extends WithHistory {
    readonly children: JSX.Element;
    readonly footer: JSX.Element;
    readonly siderProps: SiderProps;
}

export class DefaultLayoutMobile extends React.Component<DefaultLayoutMobileProps> {
    _unListenHistory: UnregisterCallback;
    _currentLocationPath: string;

    readonly state = {
        drawerVisibled: false
    };

    readonly onDrawerToggle = () => {
        this.setState({
            drawerVisibled: !this.state.drawerVisibled
        });
    }

    componentDidMount() {
        const { history } = this.props;

        this._currentLocationPath = location.pathname;
        this._unListenHistory = history.listen(o => {
            if (this._currentLocationPath !== location.pathname) {
                if (this.state.drawerVisibled) {
                    this.onDrawerToggle();
                }
            }

            this._currentLocationPath = location.pathname;
        });
    }

    componentWillUnmount() {
        this._unListenHistory();
    }

    render() {
        const { siderProps, children, footer } = this.props;
        return (
            <React.Fragment>
                <AntdLayout style={{ minHeight: '100vh' }}>
                    <AntdLayout.Header style={{ background: '#fff', padding: 0 }}>
                        <AntdIcon
                            className="sider-trigger"
                            type={siderProps.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onDrawerToggle}
                        />
                    </AntdLayout.Header>
                    <AntdLayout.Content>
                        {children}
                    </AntdLayout.Content>
                    <AntdLayout.Footer style={{ textAlign: 'center' }}>
                        {footer}
                    </AntdLayout.Footer>
                </AntdLayout>
                <AntdDrawer
                    placement="left"
                    closable={true}
                    onClose={this.onDrawerToggle}
                    visible={this.state.drawerVisibled}
                    style={{ padding: 0, height: '100vh' }}
                >
                    <AntdLayout.Sider
                        style={{ minHeight: '100vh', zIndex: 10 }}
                        {...siderProps}
                        collapsed={false}
                    />
                </AntdDrawer>
            </React.Fragment>
        );
    }
}
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { AntdIcon, AntdMenu } from '@/components';
import {
    DASHBOARD_TITLE,
    DASHBOARD_URL,
    PROFILE_TITLE,
    USER_PROFILE_URL,
    USER_URL_PREFIX
} from '@/configs';
import { WithHistory } from '@/domain';

interface DefaultLayoutSiderMenu extends WithHistory {
    readonly isSiderOpened: boolean;
}

export function DefaultLayoutSiderMenu(props: DefaultLayoutSiderMenu) {
    const { history } = props;
    let subMenuOpenKey = location.pathname.split('/')[1];
    if (subMenuOpenKey) {
        subMenuOpenKey = '/' + subMenuOpenKey;
    }

    return (
        <AntdMenu
            mode="inline"
            style={{ width: '100%' }}
            theme="dark"
            defaultOpenKeys={[subMenuOpenKey]}
            defaultSelectedKeys={[location.pathname]}
        >
            <AntdMenu.Item key={DASHBOARD_URL}>
                <AntdIcon type="dashboard" />
                <span>{DASHBOARD_TITLE}</span>
            </AntdMenu.Item>
            <AntdMenu.SubMenu
                key={USER_URL_PREFIX}
                title={(
                    <span>
                        <AntdIcon type="user" />
                        <span>User</span>
                    </span>
                )}
            >
                <AntdMenu.Item key={USER_PROFILE_URL}>
                    <AntdIcon type="idcard" />
                    <span>{PROFILE_TITLE}</span>
                </AntdMenu.Item>
            </AntdMenu.SubMenu>
        </AntdMenu>
    );
}
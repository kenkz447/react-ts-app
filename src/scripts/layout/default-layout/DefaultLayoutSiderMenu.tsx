import { Icon, Menu } from 'antd';
import * as React from 'react';

import {
    DASHBOARD_TITLE,
    DASHBOARD_URL,
    PROFILE_TITLE,
    USER_PROFILE_URL,
    USER_URL_PREFIX
} from '@/configs';
import { text } from '@/i18n';

interface DefaultLayoutSiderMenu {
    readonly onMenuItemClick: (url: string) => void;
}

export function DefaultLayoutSiderMenu(props: DefaultLayoutSiderMenu) {
    const { onMenuItemClick } = props;
    let subMenuOpenKey = location.pathname.split('/')[1];
    if (subMenuOpenKey) {
        subMenuOpenKey = '/' + subMenuOpenKey;
    }

    return (
        <Menu
            mode="inline"
            style={{ width: '100%' }}
            theme="dark"
            defaultOpenKeys={[subMenuOpenKey]}
            defaultSelectedKeys={[location.pathname]}
            onClick={({ key }) => onMenuItemClick(key)}
        >
            <Menu.Item key={DASHBOARD_URL}>
                <Icon type="dashboard" />
                <span>{text(DASHBOARD_TITLE)}</span>
            </Menu.Item>
            <Menu.SubMenu
                key={USER_URL_PREFIX}
                title={(
                    <span>
                        <Icon type="user" />
                        <span>{text('User')}</span>
                    </span>
                )}
            >
                <Menu.Item key={USER_PROFILE_URL}>
                    <Icon type="idcard" />
                    <span>{text(PROFILE_TITLE)}</span>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}
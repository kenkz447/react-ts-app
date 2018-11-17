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
        <AntdMenu
            mode="inline"
            style={{ width: '100%' }}
            theme="dark"
            defaultOpenKeys={[subMenuOpenKey]}
            defaultSelectedKeys={[location.pathname]}
            onClick={({ key }) => onMenuItemClick(key)}
        >
            <AntdMenu.Item key={DASHBOARD_URL}>
                <AntdIcon type="dashboard" />
                <span>{text(DASHBOARD_TITLE)}</span>
            </AntdMenu.Item>
            <AntdMenu.SubMenu
                key={USER_URL_PREFIX}
                title={(
                    <span>
                        <AntdIcon type="user" />
                        <span>{text('User')}</span>
                    </span>
                )}
            >
                <AntdMenu.Item key={USER_PROFILE_URL}>
                    <AntdIcon type="idcard" />
                    <span>{text(PROFILE_TITLE)}</span>
                </AntdMenu.Item>
            </AntdMenu.SubMenu>
        </AntdMenu>
    );
}
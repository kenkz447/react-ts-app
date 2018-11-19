import { Icon } from 'antd';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { RouteInfo } from '@/app';
import { PageWrapper } from '@/components';
import {
    DASHBOARD_TITLE,
    DASHBOARD_URL,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { text } from '@/i18n';

type RouteTopicsProps = AppPageProps;

export class RouteTopics extends RoutePage<RouteTopicsProps> {
    static readonly routeInfo: RouteInfo = {
        path: TOPICS_URL,
        title: text(TOPICS_TITLE),
        exact: true,
        policies: [isRoot]
    };

    render() {
        return (
            <PageWrapper
                headerProps={{
                    breadcrumbList: [{
                        href: DASHBOARD_TITLE,
                        title: <Icon type="home" />
                    }, {
                        title: text(TOPICS_TITLE)
                    }],
                    itemRender: (item) => {
                        if (!item.href) {
                            return <span>{item.title}</span>;
                        }

                        return <Link to={item.href}>{item.title}</Link>;
                    }
                }}
            >
                <div style={{ padding: 24 }}>
                    Welcome to topics!
                </div>
            </PageWrapper>
        );
    }
}
import { Card, Icon } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_DETAIL_PATH,
    TOPICS_DETAIL_TITLE,
    TOPICS_NEW_TITLE,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { text } from '@/i18n';

export class RouteTopicDetail extends RoutePage<AppPageProps> {
    static readonly routeInfo: RouteInfo = {
        path: TOPICS_DETAIL_PATH,
        title: text(TOPICS_DETAIL_TITLE),
        exact: true,
        policies: [isRoot]
    };

    readonly getHeaderProps = () => {
        return {
            title: text(TOPICS_NEW_TITLE),
            breadcrumbList: [{
                href: DASHBOARD_URL,
                title: <Icon type="home" />
            }, {
                href: TOPICS_URL,
                title: text(TOPICS_TITLE)
            }, {
                title: text(TOPICS_DETAIL_TITLE)
            }]
        };
    }

    render() {
        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Card>
                        {null}
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}
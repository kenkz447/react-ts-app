import { Button, Card, Icon } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_NEW_TITLE,
    TOPICS_NEW_URL,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { TopicFormControl } from '@/forms/topic';
import { text } from '@/i18n';

type RouteTopicsNewProps = AppPageProps;

export class RouteTopicNew extends RoutePage<RouteTopicsNewProps> {
    static readonly routeInfo: RouteInfo = {
        path: TOPICS_NEW_URL,
        title: text(TOPICS_NEW_TITLE),
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
                title: text(TOPICS_NEW_TITLE)
            }]
        };
    }

    render() {
        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Card>
                        <TopicFormControl />
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}
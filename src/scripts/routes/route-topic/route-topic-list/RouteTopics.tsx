import { Button, Card, Icon } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_NEW_URL,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, DomainContext, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { text } from '@/i18n';

import { TopicListContainer } from './containers';

type RouteTopicsProps = AppPageProps;

export class RouteTopicList extends RoutePage<RouteTopicsProps> {
    static readonly withContext: Array<keyof DomainContext> = ['history'];

    static readonly routeInfo: RouteInfo = {
        path: TOPICS_URL,
        title: text(TOPICS_TITLE),
        exact: true,
        policies: [isRoot]
    };

    readonly getHeaderProps = () => {
        const { history } = this.props;
        return {
            title: text('Topics'),
            action: (
                <Button
                    type="primary"
                    onClick={() => history.push(TOPICS_NEW_URL)}
                >
                    {text('New topics')}
                </Button>
            ),
            breadcrumbList: [{
                href: DASHBOARD_URL,
                title: <Icon type="home" />
            }, {
                title: text(TOPICS_TITLE)
            }]
        };
    }

    render() {
        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Card bordered={false}>
                        <TopicListContainer />
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}
import { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import { Avatar, Button, Card, Icon } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_DETAIL_PATH,
    TOPICS_DETAIL_TITLE,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { text } from '@/i18n';
import { request, Topic, topicResources } from '@/restful';

type RouteTopicDetailProps = AppPageProps<{ readonly id: string }>;

interface RouteTopicDetailState {
    readonly topic: Topic;
}

export class RouteTopicDetail extends RoutePage<RouteTopicDetailProps, RouteTopicDetailState> {
    static readonly routeInfo: RouteInfo = {
        path: TOPICS_DETAIL_PATH,
        title: text(TOPICS_DETAIL_TITLE),
        exact: true,
        policies: [isRoot]
    };

    readonly state: RouteTopicDetailState = {
        topic: this.props.location.state
    };

    readonly getHeaderProps = (): IPageHeaderProps => {
        const { history } = this.props;
        const { topic } = this.state;

        const topicName = topic ? topic.name : text(TOPICS_DETAIL_TITLE);

        return {
            title: topicName,
            content: topic && topic.description,
            action: (
                <Button
                    type="primary"
                    onClick={() => history.push('/topics/learn')}
                >
                    {text('Start learning')}
                </Button>
            ),
            logo: (<Avatar shape="square" size="large">{topicName[0]}</Avatar>),
            breadcrumbList: [{
                href: DASHBOARD_URL,
                title: <Icon type="home" />
            }, {
                href: TOPICS_URL,
                title: text(TOPICS_TITLE)
            }, {
                title: topicName
            }]
        };
    }

    readonly fetchTopic = async () => {
        const { topic } = this.state;
        if (topic) {
            return;
        }
        const { match } = this.props;
        const { id } = match.params;

        const currentTopic = await request(topicResources.findOne, {
            type: 'path',
            parameter: 'id',
            value: id
        });

        this.setState({
            topic: currentTopic
        });
    }

    render() {
        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Card bordered={false}>
                        {null}
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}
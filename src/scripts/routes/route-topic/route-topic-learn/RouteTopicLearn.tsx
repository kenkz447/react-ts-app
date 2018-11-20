import { Button, Card, Col, Icon, Row } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_DETAIL_PATH,
    TOPICS_LEARN_TITLE,
    TOPICS_LEARN_URL,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { text } from '@/i18n';
import { request, Topic, topicResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

type RouteTopicsNewProps = AppPageProps<Topic>;

interface RouteTopicDetailState {
    readonly topic: Topic;
}

export class RouteTopicLean extends RoutePage<RouteTopicsNewProps, RouteTopicDetailState> {
    static readonly routeInfo: RouteInfo = {
        path: TOPICS_LEARN_URL,
        title: text(TOPICS_LEARN_TITLE),
        exact: true,
        policies: [isRoot]
    };

    constructor(props: RouteTopicsNewProps) {
        super(props);
        const { location, match } = props;

        let defaultTopic = location.state;

        if (!defaultTopic) {
            defaultTopic = {
                id: match.params.id,
                name: 'topic'
            };

            this.fetchTopic(defaultTopic.id);
        }

        this.state = {
            topic: defaultTopic
        };
    }

    readonly fetchTopic = async (topicId: string) => {
        const currentTopic = await request(topicResources.findOne, {
            type: 'path',
            parameter: 'id',
            value: topicId
        });

        this.setState({
            topic: currentTopic
        });
    }

    readonly getHeaderProps = () => {
        const { topic } = this.state;

        return {
            title: text(TOPICS_LEARN_TITLE),
            breadcrumbList: [{
                href: DASHBOARD_URL,
                title: <Icon type="home" />
            }, {
                href: TOPICS_URL,
                title: text(TOPICS_TITLE)
            }, {
                href: replaceRoutePath(TOPICS_DETAIL_PATH, topic),
                title: topic.name
            }]
        };
    }

    render() {
        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Card>
                                {null}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                {null}
                            </Card>
                        </Col>
                    </Row>
                </PageContent>
            </PageWrapper>
        );
    }
}
import { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import { Avatar, Button, Card, Icon } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import {
    DASHBOARD_URL,
    TOPICS_DETAIL_PATH,
    TOPICS_DETAIL_TITLE,
    TOPICS_LEARN_URL,
    TOPICS_TITLE,
    TOPICS_URL
} from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';
import { NewWordFormControl } from '@/forms/word';
import { text } from '@/i18n';
import { request, Topic, topicResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

import { TopicWordsContainer } from './containers';

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

    constructor(props: RouteTopicDetailProps) {
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

    readonly getHeaderProps = (): IPageHeaderProps => {
        const { history } = this.props;
        const { topic } = this.state;

        const topicName = topic ? topic.name : text(TOPICS_DETAIL_TITLE);
        const learnPageUrl = replaceRoutePath(TOPICS_LEARN_URL, topic);

        return {
            title: topicName,
            content: topic && topic.description,
            action: (
                <Button
                    type="primary"
                    onClick={() => history.push({
                        pathname: learnPageUrl,
                        state: topic
                    })}
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
            }]
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

    render() {
        const { topic } = this.state;
        const { match } = this.props;

        return (
            <PageWrapper headerProps={this.getHeaderProps()}>
                <PageContent>
                    <Card
                        style={{ marginBottom: 24 }}
                        bordered={false}
                        title="Add new word"
                    >
                        <NewWordFormControl initialValues={{ topic: topic }} />
                    </Card>
                    <Card bordered={false}>
                        <TopicWordsContainer
                            topicId={match.params.id}
                            defaultWords={topic && topic.words}
                        />
                    </Card>
                </PageContent>
            </PageWrapper>
        );
    }
}
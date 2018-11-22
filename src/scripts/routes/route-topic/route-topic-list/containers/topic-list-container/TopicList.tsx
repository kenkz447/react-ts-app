import {
    Avatar,
    Button,
    Col,
    List,
    Modal,
    Progress,
    Row,
    Skeleton
} from 'antd';
import * as React from 'react';
import { RestfulRenderChildProps } from 'react-restful';
import { Link } from 'react-router-dom';

import { TOPICS_DETAIL_PATH } from '@/configs';
import { text } from '@/i18n';
import { request, Topic, topicResources } from '@/restful';
import { formatDate, replaceRoutePath } from '@/utilities';

const flexCenterStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
};

type TopicListProps = RestfulRenderChildProps<Topic[]>;

export class TopicList extends React.PureComponent<TopicListProps> {
    readonly skeletonData = [1, 2, 3, 4];

    readonly onTopicDelete = (topic: Topic) => {
        Modal.confirm({
            title: text('You are sure?'),
            content: text('This action will not be undone.'),
            okType: 'danger',
            okText: text('Delete any way!'),
            onOk: () => {
                return request(
                    topicResources.delete,
                    {
                        type: 'path',
                        parameter: 'id',
                        value: topic.id
                    }
                );
            }
        });
    }

    readonly renderListItemActions = (topic: Topic) => {
        if (!topic.id) {
            return [];
        }

        return [(
            <Button
                key="delete"
                type="danger"
                ghost={true}
                onClick={() => this.onTopicDelete(topic)}
            >
                {text('Delete')}
            </Button>
        )];
    }

    readonly renderListItem = (topic: Topic & { readonly loading: boolean }) => {
        const { data, fetching } = this.props;
        return (
            <List.Item actions={this.renderListItemActions(topic)}>
                <Skeleton
                    title={false}
                    loading={data!.length === 0 && fetching}
                    active={true}
                    avatar={true}
                >
                    <List.Item.Meta
                        avatar={(
                            <Avatar shape="square" size="large">
                                {topic.name && topic.name[0].toLocaleUpperCase()}
                            </Avatar>
                        )}
                        title={(
                            <Link
                                to={{
                                    pathname: replaceRoutePath(TOPICS_DETAIL_PATH, topic),
                                    state: topic
                                }}
                            >
                                {topic.name}
                            </Link>
                        )}
                        description={topic.description}
                    />
                    <div style={flexCenterStyle}>
                        <Row gutter={30} type="flex">
                            <Col span={6} style={flexCenterStyle}>
                                <div style={{ minWidth: 150 }}>
                                    <small>{text('Words')}</small>
                                    <div>{topic.totalWords}</div>
                                </div>
                            </Col>
                            <Col span={10} style={flexCenterStyle}>
                                <div style={{ minWidth: 150 }}>
                                    <small>{text('Created at ')}</small>
                                    <div>{formatDate(topic.createdAt, 'YY/MM/DD')}</div>
                                </div>
                            </Col>
                            <Col span={8} style={flexCenterStyle}>
                                <Progress strokeColor="#1890ff" percent={topic.memorize || 0} size="small" />
                            </Col>
                        </Row>
                    </div>
                </Skeleton>
            </List.Item>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <List
                itemLayout="horizontal"
                dataSource={data!.length ? data : this.skeletonData}
                renderItem={this.renderListItem}
            />
        );
    }
}
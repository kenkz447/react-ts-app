import { Avatar, Col, List, Progress, Row, Skeleton } from 'antd';
import * as React from 'react';
import { RestfulRenderChildProps } from 'react-restful';
import { Link } from 'react-router-dom';

import { TOPICS_DETAIL_PATH } from '@/configs';
import { text } from '@/i18n';
import { Topic } from '@/restful';
import { replaceRoutePath } from '@/utilities';

const flexCenterStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
}

type TopicListProps = RestfulRenderChildProps<Topic[]>;

export class TopicList extends React.PureComponent<TopicListProps> {
    readonly skeletonData = [1, 2, 3, 4];
    readonly renderListItem = (topic: Topic & { readonly loading: boolean }) => {
        const { data, fetching } = this.props;
        return (
            <List.Item
                actions={topic.id ? [<a key="delete" href="x">{text('Delete')}</a>] : []}
            >
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
                                <div>
                                    <small>{text('Word count')}</small>
                                    <div>{0}</div>
                                </div>
                            </Col>
                            <Col span={10} style={flexCenterStyle}>
                                <div style={{ minWidth: 150 }}>
                                    <small>{text('Created at ')}</small>
                                    <div>{topic.createdAt}</div>
                                </div>
                            </Col>
                            <Col span={8} style={flexCenterStyle}>
                                <Progress percent={topic.memorize || 0} size="small" />
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
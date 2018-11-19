import { Avatar, Col, List, Progress, Row, Skeleton } from 'antd';
import * as React from 'react';
import { RestfulRenderChildProps } from 'react-restful';
import { Link } from 'react-router-dom';

import { TOPICS_DETAIL_PATH } from '@/configs';
import { text } from '@/i18n';
import { Topic } from '@/restful';
import { replaceRoutePath } from '@/utilities';

type TopicListProps = RestfulRenderChildProps<Topic[]>;

export class TopicList extends React.PureComponent<TopicListProps> {
    readonly skeletonData = [1, 2, 3, 4];
    readonly renderListItem = (topic: Topic & { readonly loading: boolean }) => {
        const { fetching } = this.props;
        return (
            <List.Item
                actions={topic.id ? [<a key="delete" href="x">{text('Delete')}</a>] : []}
            >
                <Skeleton
                    title={false}
                    loading={fetching}
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
                            <Link to={replaceRoutePath(TOPICS_DETAIL_PATH, topic)}>
                                {topic.name}
                            </Link>
                        )}
                        description={topic.description}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Row gutter={30} type="flex">
                            <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <small>{text('Word count')}</small>
                                    <br />
                                    <span>
                                        {0}
                                    </span>
                                </div>
                            </Col>
                            <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ minWidth: 150 }}>
                                    <small>{text('Created at ')}</small>
                                    <br />
                                    <span>
                                        {topic.createdAt}
                                    </span>
                                </div>
                            </Col>
                            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
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
                dataSource={data || this.skeletonData}
                renderItem={this.renderListItem}
            />
        );
    }
}
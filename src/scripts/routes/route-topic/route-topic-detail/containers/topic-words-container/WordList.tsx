import { Button, Icon, Table } from 'antd';
import * as React from 'react';
import { RestfulDataContainer, RestfulRenderChildProps } from 'react-restful';

import { text } from '@/i18n';
import { Word, wordResourceType } from '@/restful';

type WordListProps = RestfulRenderChildProps<Word[]>;

export class WordList extends React.PureComponent<WordListProps> {
    public render() {
        const { data, fetching } = this.props;
        return (
            <RestfulDataContainer
                dataSource={data || []}
                resourceType={wordResourceType}
                shouldAppendNewRecord={() => true}
            >
                {(syncData) => {
                    return (
                        <Table
                            dataSource={syncData}
                            bordered={false}
                            loading={fetching}
                            rowKey="id"
                            pagination={false}
                        >
                            <Table.Column
                                title="Source"
                                dataIndex={nameof<Word>(o => o.source)}
                            />
                            <Table.Column
                                title="Translation"
                                dataIndex={nameof<Word>(o => o.translation)}
                            />
                            <Table.Column
                                title="Example"
                                dataIndex={nameof<Word>(o => o.examples)}
                                render={(examples) => {
                                    if (!examples) {
                                        return (
                                            <small>{text('No example')}</small>
                                        );
                                    }

                                    return examples;
                                }}
                            />
                            <Table.Column
                                title=" "
                                dataIndex={nameof<Word>(o => o.id)}
                                width={45}
                                render={(id, word) => {
                                    return (
                                        <Button
                                            type="danger"
                                            ghost={true}
                                            size="small"
                                        >
                                            <Icon type="delete" />
                                        </Button>
                                    );
                                }}
                            />
                        </Table>
                    );
                }}
            </RestfulDataContainer>
        );
    }
}

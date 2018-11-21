import { Button, Icon, Modal, Progress, Table } from 'antd';
import * as React from 'react';
import { RestfulDataContainer, RestfulRenderChildProps } from 'react-restful';

import { EditableInput } from '@/components';
import { text } from '@/i18n';
import { request, Word, wordResources, wordResourceType } from '@/restful';

type WordListProps = RestfulRenderChildProps<Word[]>;

export class WordList extends React.PureComponent<WordListProps> {
    public render() {
        const { data, fetching } = this.props;
        return (
            <RestfulDataContainer
                dataSource={data || []}
                resourceType={wordResourceType}
            >
                {(syncData) => {
                    return (
                        <Table
                            dataSource={syncData}
                            bordered={false}
                            loading={!data && fetching}
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
                                render={(translation, word: Word) => {
                                    return (
                                        <EditableInput
                                            defaultValue={translation}
                                            allowEmpty={false}
                                            doneMessage="Success"
                                            onResult={(newInputValue) =>
                                                request(
                                                    wordResources.update,
                                                    [{
                                                        type: 'body',
                                                        value: {
                                                            ...word,
                                                            translation: newInputValue
                                                        }
                                                    }]
                                                )
                                            }
                                        />
                                    );
                                }}
                            />
                            <Table.Column
                                title="Example"
                                dataIndex={nameof<Word>(o => o.examples)}
                                render={(examples, word: Word) => {
                                    return (
                                        <EditableInput
                                            defaultValue={examples}
                                            placeholder="missing example..."
                                            doneMessage="Success"
                                            onResult={(newInputValue) =>
                                                request(
                                                    wordResources.update,
                                                    [{
                                                        type: 'body',
                                                        value: {
                                                            ...word,
                                                            examples: newInputValue
                                                        }
                                                    }]
                                                )
                                            }
                                        />
                                    );
                                }}
                            />
                            <Table.Column
                                title="Memo"
                                dataIndex={nameof<Word>(o => o.memorize)}
                                width={145}
                                render={(memorize) => {
                                    return <Progress showInfo={false} percent={memorize || 0} />;
                                }}
                            />
                            <Table.Column
                                title=" "
                                dataIndex={nameof<Word>(o => o.id)}
                                width={45}
                                render={(id, word) => {
                                    const onDeleteBtnCLick = () => {
                                        const onDelete = async () => {
                                            await request(
                                                wordResources.delete,
                                                {
                                                    type: 'path',
                                                    parameter: 'id',
                                                    value: id
                                                }
                                            );
                                        };

                                        Modal.confirm({
                                            title: text('Needs confirm'),
                                            content: text('Delete this word?'),
                                            okType: 'danger',
                                            onOk: onDelete
                                        });
                                    };

                                    return (
                                        <Button
                                            type="danger"
                                            ghost={true}
                                            size="small"
                                            onClick={onDeleteBtnCLick}
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

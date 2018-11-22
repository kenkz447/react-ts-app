import { Button, Icon, Modal, Progress, Table } from 'antd';
import * as React from 'react';
import { RestfulDataContainer, RestfulRenderChildProps } from 'react-restful';

import { EditableInput } from '@/components';
import { text } from '@/i18n';
import { request, Word, wordResources, wordResourceType } from '@/restful';

type WordListProps = RestfulRenderChildProps<Word[]>;

export class WordList extends React.PureComponent<WordListProps> {

    readonly renderSourceText = (sourceText: string) => {
        const enabledVoice = ('speechSynthesis' in window);
        return (
            <div>
                <span
                    style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        lineHeight: '1',
                        marginRight: 5
                    }}
                >
                    {sourceText}
                </span>
                {enabledVoice && (
                    <span
                        style={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            lineHeight: '1',
                            fontSize: 16,
                            cursor: 'pointer'
                        }}
                    >
                        <Icon
                            type="play-circle"
                            theme="twoTone"
                            onClick={() => this.doSpeech(sourceText)}
                        />
                    </span>
                )}
            </div>
        );
    }
    readonly doSpeech = (sourceText: string) => {
        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        const googleGBVoices = voices.filter(o => o.lang === 'en-GB');
        msg.voice = googleGBVoices[1];
        msg.volume = 1; // 0 to 1
        msg.rate = .8; // 0.1 to 10
        msg.pitch = 1; // 0 to 2
        msg.text = sourceText;
        msg.lang = 'en-GB';
        speechSynthesis.speak(msg);
    }

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
                                title={text('Source')}
                                dataIndex={nameof<Word>(o => o.source)}
                                render={this.renderSourceText}
                            />
                            <Table.Column
                                title={text('Meaning')}
                                dataIndex={nameof<Word>(o => o.translation)}
                                render={(translation, word: Word) => {
                                    return (
                                        <EditableInput
                                            defaultValue={translation}
                                            allowEmpty={false}
                                            onResult={async (newInputValue) => {
                                                if (newInputValue === translation) {
                                                    return;
                                                }

                                                await request(
                                                    wordResources.update,
                                                    [{
                                                        type: 'body',
                                                        value: {
                                                            ...word,
                                                            translation: newInputValue
                                                        }
                                                    }]
                                                );
                                            }}
                                        />
                                    );
                                }}
                            />
                            <Table.Column
                                title={text('Example')}
                                dataIndex={nameof<Word>(o => o.examples)}
                                render={(examples, word: Word) => {
                                    return (
                                        <EditableInput
                                            defaultValue={examples}
                                            placeholder="missing example..."
                                            onResult={async (newInputValue) => {
                                                if (newInputValue === examples) {
                                                    return;
                                                }

                                                await request(
                                                    wordResources.update,
                                                    [{
                                                        type: 'body',
                                                        value: {
                                                            ...word,
                                                            examples: newInputValue
                                                        }
                                                    }]
                                                );
                                            }}
                                        />
                                    );
                                }}
                            />
                            <Table.Column
                                title="Memo"
                                dataIndex={nameof<Word>(o => o.memorize)}
                                width={145}
                                render={(memorize) => {
                                    return <Progress strokeColor="#40a9ff" showInfo={false} percent={memorize || 0} />;
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

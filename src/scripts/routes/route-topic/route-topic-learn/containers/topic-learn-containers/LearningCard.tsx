import { Card, Progress, Tag } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

import { EditableInput } from '@/components';
import { text } from '@/i18n';
import { Word } from '@/restful';

const LearningCardWrapper = styled.div`
    .translation {
        &-area {
            margin-bottom: 15px;
        }
        &-text {
            margin-bottom: 0;
            &::first-letter {
                text-transform: uppercase;
            }
        }
    }
    .progress-wrapper {
        width: 200px;
        margin-bottom: 15px;
    }
    .ant-progress-inner {
        background-color: #fff;
    }
`;

const LearningCardBody = styled.div`
    display: block;
`;

export interface LearningResult {
    readonly correctWords: Word[];
}

interface LearningCardProps {
    readonly words: Word[];
    readonly onCompleted: (result: LearningResult) => void;
}

interface LearningCardState {
    readonly currentWordIndex: number;
    readonly currentWord: Word;
    readonly correctWords: Word[];
    readonly lastInputIncorrect: boolean;
    readonly lastInputValue: string;
    readonly showAnswer: boolean;
}

export class LearningCard extends React.PureComponent<LearningCardProps, LearningCardState> {
    constructor(props: LearningCardProps) {
        super(props);
        const { words } = props;
        this.state = {
            currentWordIndex: 0,
            currentWord: words[0],
            correctWords: [],
            lastInputIncorrect: false,
            showAnswer: false,
            lastInputValue: ''
        };
    }

    readonly toNextWord = (answerValue?: string) => {
        const { words, onCompleted } = this.props;
        const {
            currentWord,
            currentWordIndex,
            correctWords,
            lastInputValue
        } = this.state;

        const nextIndex = currentWordIndex + 1;
        let nextCorrectWords = [...correctWords];

        const answer = answerValue || lastInputValue;
        if (answer === currentWord.source) {
            nextCorrectWords.push(currentWord);
        }

        if (nextIndex === words.length) {
            return void onCompleted({
                correctWords: nextCorrectWords
            });
        }

        this.setState({
            currentWordIndex: nextIndex,
            currentWord: words[nextIndex],
            correctWords: nextCorrectWords,
            lastInputIncorrect: false,
            showAnswer: false
        });
    }

    readonly getHiddenSourceText = () => {
        const { currentWord } = this.state;
        const chars: string[] = [];
        for (let index = 0; index < currentWord.source.length; index++) {
            chars.push('*');
        }

        return chars.join('');
    }

    readonly onAnswer = async (value: string) => {
        const {
            currentWord,
            lastInputIncorrect
        } = this.state;

        if (lastInputIncorrect) {
            return;
        }

        if (value === currentWord.source) {
            return void this.toNextWord(value);
        }

        this.setState({
            lastInputIncorrect: true,
            showAnswer: true,
            lastInputValue: value
        });
    }

    readonly reAnswerOnEnter = (e: React.KeyboardEvent<HTMLInputElement>, value) => {
        const {
            currentWord,
            lastInputIncorrect
        } = this.state;

        if (e.key !== 'Enter') {
            this.setState({
                showAnswer: false
            });
            return;
        }

        if (!lastInputIncorrect) {
            return;
        }

        if (value !== currentWord.source) {
            return;
        }

        this.toNextWord();
    }

    readonly getCurrentProgress = () => {
        const { words } = this.props;
        const { currentWordIndex } = this.state;

        return 100 * currentWordIndex / words.length;
    }

    public render() {
        const {
            currentWord,
            currentWordIndex,
            showAnswer
        } = this.state;

        return (
            <LearningCardWrapper>
                <div className="progress-wrapper">
                    <Progress
                        strokeColor="#52c41a"
                        percent={this.getCurrentProgress()}
                        width={200}
                        trailColor="#fff"
                    />
                </div>
                <Card>
                    <LearningCardBody>
                        <div className="translation-area">
                            <h2 className="translation-text">{currentWord.translation}</h2>
                            {
                                showAnswer ?
                                    (<Tag color="red">{currentWord.source}</Tag>) :
                                    (<Tag color="geekblue">{this.getHiddenSourceText()}</Tag>)
                            }
                        </div>
                        <EditableInput
                            key={currentWordIndex}
                            defaultValue=""
                            showBorder={true}
                            autoFocus={true}
                            placeholder={text('Your answer...')}
                            allowEmpty={true}
                            resultOnBlur={false}
                            clearAfterDone={true}
                            onKeyPress={this.reAnswerOnEnter}
                            onResult={this.onAnswer}
                        />
                    </LearningCardBody>
                </Card>
            </LearningCardWrapper>
        );
    }
}

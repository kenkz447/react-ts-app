import { Col, Row } from 'antd';
import * as React from 'react';

import { Topic } from '@/restful';

import {
    LearningCard,
    LearningResult,
    ResultCard
} from './topic-learn-containers';

export interface TopicLearnContainerProps {
    readonly topic: Topic;
}

interface TopicLearnContainerState {
    readonly learningResult: LearningResult | null;
}

export class TopicLearnContainer extends React.PureComponent<
    TopicLearnContainerProps,
    TopicLearnContainerState
    > {

    constructor(props: TopicLearnContainerProps) {
        super(props);
        this.state = {
            learningResult: null
        };
    }

    readonly resetLearning = () => {
        this.setState({
            learningResult: null
        });
    }

    public render() {
        const { topic } = this.props;

        if (!topic.words || !topic.words.length) {
            return null;
        }

        const { learningResult } = this.state;

        if (learningResult) {
            return (
                <ResultCard
                    topic={topic}
                    onAgain={this.resetLearning}
                    words={topic.words}
                    learningResult={learningResult}
                />
            );
        }

        return (
            <LearningCard
                words={topic.words}
                onCompleted={(result) => this.setState({
                    learningResult: result
                })}
            />
        );
    }
}

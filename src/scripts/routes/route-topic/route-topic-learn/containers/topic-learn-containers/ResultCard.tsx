import 'ant-design-pro/lib/Charts/style/css';

import { Pie } from 'ant-design-pro/lib/Charts';
import { Button, Card, Divider, Icon } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TOPICS_DETAIL_PATH } from '@/configs';
import { text } from '@/i18n';
import { Topic, Word } from '@/restful';
import { replaceRoutePath } from '@/utilities';

import { LearningResult } from './LearningCard';

const ResultCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .header {
        &-text {
            margin-bottom: 0;
        }
    }
    .body-chart {
        height: 140px;
        width: 140px;
        margin-bottom: 24px;
    }
`;

interface ResultCardProps {
    readonly topic: Topic;
    readonly words: Word[];
    readonly learningResult: LearningResult;
    readonly onAgain: () => void;
}

export class ResultCard extends React.PureComponent<ResultCardProps> {
    readonly getProgress = () => {
        const { learningResult, words } = this.props;
        const { correctWords } = learningResult;

        return 100 * correctWords.length / words.length;
    }

    public render() {
        const progress = this.getProgress();
        const { onAgain, topic } = this.props;

        return (
            <Card>
                <ResultCardWrapper>
                    <h2 className="header-text">
                        {text('Finished')}
                    </h2>
                    <p className="header-description">{text('Below is your current progress:')}</p>
                    <div className="body-chart">
                        <Pie
                            percent={progress}
                            color="#52c41a"
                            subTitle="Progress"
                            total={`${progress}%`}
                            height={140}
                        />
                    </div>
                    <div>
                        <Button onClick={onAgain} type="ghost" size="large">
                            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> {text('Again')}
                        </Button>
                        <Divider type="vertical" />
                        <Link to={replaceRoutePath(TOPICS_DETAIL_PATH, topic)}>
                            <Icon type="left-circle" theme="twoTone" />
                            <span>{' '}</span>
                            {text('Go back')}
                        </Link>
                    </div>
                </ResultCardWrapper>
            </Card>
        );
    }
}
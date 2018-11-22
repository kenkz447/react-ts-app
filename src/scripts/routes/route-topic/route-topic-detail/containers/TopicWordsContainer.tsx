import * as React from 'react';

import { Word } from '@/restful';

import { WordList } from './topic-words-container';

interface TopicWordsContainerProps {
    readonly topicId: string;
    readonly defaultWords: Word[];
}

export const TopicWordsContainer = React.memo((props: TopicWordsContainerProps) => {
    const { defaultWords } = props;
    return <WordList data={defaultWords} error={null} />;
});
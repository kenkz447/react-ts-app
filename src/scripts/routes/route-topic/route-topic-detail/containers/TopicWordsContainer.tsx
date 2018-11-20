import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Word, wordResources } from '@/restful';

import { WordList } from './topic-words-container';

interface TopicWordsContainerProps {
    readonly topicId: string;
    readonly defaultWords: Word[];
}

export const TopicWordsContainer = React.memo((props: TopicWordsContainerProps) => {
    const { topicId, defaultWords } = props;
    return (
        <RestfulRender
            resource={wordResources.find}
            parameters={{
                type: 'query',
                parameter: nameof<Word>(o => o.topic),
                value: topicId
            }}
            render={WordList}
            defaultData={defaultWords}
        />
    );
});
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Topic, Word, wordResources } from '@/restful';

import { WordList } from './topic-words-container';

interface TopicWordsContainerProps {
    readonly topic: Topic;
}

export const TopicWordsContainer = React.memo((props: TopicWordsContainerProps) => {
    const { topic } = props;
    return (
        <RestfulRender
            resource={wordResources.find}
            parameters={{
                type: 'query',
                parameter: nameof<Word>(o => o.topic),
                value: topic.id
            }}
            render={WordList}
        />
    );
});
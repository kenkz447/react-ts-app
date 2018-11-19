import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { topicResources } from '@/restful';

import { TopicList } from './topic-list-container';

export const TopicListContainer = React.memo(() => {
    return (
        <RestfulRender
            resource={topicResources.find}
            render={TopicList}
        />
    );
});
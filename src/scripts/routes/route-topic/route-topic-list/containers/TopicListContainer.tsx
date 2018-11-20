import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { restfulStore, topicResources, topicResourceType } from '@/restful';

import { TopicList } from './topic-list-container';

export const TopicListContainer = React.memo(() => {
    return (
        <RestfulRender
            defaultData={restfulStore.findManyRecords(topicResourceType, o => true)}
            resource={topicResources.find}
            render={TopicList}
        />
    );
});
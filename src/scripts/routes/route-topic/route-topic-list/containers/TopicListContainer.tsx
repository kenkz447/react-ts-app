import * as React from 'react';
import { RestfulRender } from 'react-restful';

import {
    restfulStore,
    Topic,
    topicResources,
    topicResourceType
} from '@/restful';

import { TopicList } from './topic-list-container';

export const TopicListContainer = React.memo(() => {
    return (
        <RestfulRender
            defaultData={restfulStore.findManyRecords(topicResourceType, o => true)}
            resource={topicResources.find}
            parameters={{
                type: 'query',
                parameter: '_sort',
                value: `${nameof<Topic>(o => o.memorize)}:desc`
            }}
            render={TopicList}
        />
    );
});
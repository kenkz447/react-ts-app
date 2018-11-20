import { Resource, ResourceType } from 'react-restful';

import { Topic } from './topic';

export interface Word {
    readonly id: string;
    readonly source: string;
    readonly translation: string;
    readonly examples: string;
    readonly memorize: number;
    readonly topic: Topic;
}

export const wordResourceType = new ResourceType<Word>('Word');

export const wordResources = {
    find: new Resource<Word[]>({
        resourceType: wordResourceType,
        url: '/words'
    }),
    findOne: new Resource<Word>({
        resourceType: wordResourceType,
        url: '/words/:id'
    }),
    create: new Resource<Word>({
        resourceType: wordResourceType,
        url: '/words',
        method: 'POST'
    }),
    update: new Resource<Word>({
        resourceType: wordResourceType,
        url: '/words/:id',
        method: 'PUT',
        getDefaultParams: (params) => {
            const bodyParams = params.find(o => o.type === 'body');
            if (!bodyParams) {
                throw new Error('PUT request need a body!');
            }
            const bodyValue = bodyParams.value as Word;
            return {
                type: 'path',
                parameter: 'id',
                value: bodyValue.id,
            };
        }
    }),
    delete: new Resource<Word>({
        resourceType: wordResourceType,
        url: '/words/:id',
        method: 'DELETE'
    })
};
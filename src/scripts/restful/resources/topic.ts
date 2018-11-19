import { Resource, ResourceType } from 'react-restful';

import { Word } from './word';

export interface Topic {
    readonly id: string;
    readonly name: string;
    readonly sourceLang: string;
    readonly targetLang: string;
    readonly description: string;
    readonly memorize: number;
    readonly createdAt: string;
    readonly words: Word[];
}

export const topicResourceType = new ResourceType<Topic>('Topic');

export const topicResources = {
    find: new Resource<Topic[]>({
        resourceType: topicResourceType,
        url: '/topics'
    }),
    findOne: new Resource<Topic>({
        resourceType: topicResourceType,
        url: '/topics/:id'
    }),
    create: new Resource<Topic>({
        resourceType: topicResourceType,
        url: '/topics',
        method: 'POST'
    }),
    update: new Resource<Topic>({
        resourceType: topicResourceType,
        url: '/topics/:id',
        method: 'PUT'
    }),
    delete: new Resource<Topic>({
        resourceType: topicResourceType,
        url: '/topics/:id',
        method: 'DELETE'
    })
};
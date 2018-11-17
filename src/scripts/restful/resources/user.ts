import { Resource, ResourceType } from 'react-restful';

import { Role } from './role';

export interface User {
    readonly id: string;
    readonly name?: string;
    readonly email: string;
    readonly role: Role;
    readonly username: string;
    readonly confirmed?: boolean;
}

export const userResourceType = new ResourceType<User>('User');

export const userResources = {
    me: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/me'
    }),
    update: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/:id',
        method: 'PUT'
    })
};
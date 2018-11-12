import { Record, Resource, ResourceType } from 'react-restful';

import { Salon } from './salon';

export interface User extends Record {
    readonly activated: true;
    readonly email: string;
    readonly firstName: string;
    readonly id: number;
    readonly imageUrl: string;
    readonly langKey: string;
    readonly lastName: string;
    readonly login: string;
    readonly name: string;
    readonly salon: Salon;
    readonly salonId: number;
}

export interface DeletedUserMeta {
    readonly deletedUser: User;
}

export const userResourceType = new ResourceType<User>(nameof<User>());

export const userResources = {
    findOne: new Resource<User>({
        resourceType: userResourceType,
        url: '/users/:id'
    })
};
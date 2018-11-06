import { Record, Resource, ResourceType } from 'react-restful';

import { Salon } from './salon';

export interface User extends Record {
    readonly activated: true;
    readonly activationKey: string;
    readonly createdBy: string;
    readonly createdDate: string;
    readonly email: string;
    readonly firstName: string;
    readonly id: number;
    readonly imageUrl: string;
    readonly langKey: string;
    readonly lastModifiedBy: string;
    readonly lastModifiedDate: string;
    readonly lastName: string;
    readonly login: string;
    readonly name: string;
    readonly passwordHash: string;
    readonly resetDate: string;
    readonly resetKey: string;
    readonly salon: Salon;
    readonly salonId: number;
}

export interface DeletedUserMeta {
    readonly deletedUser: User;
}

export const userResourceType = new ResourceType<User>(nameof<User>());

export const userResources = {
    getById: new Resource<User>({
        resourceType: userResourceType,
        url: '/Users/:id',
        getResponseData: async (requestInfo) => {
            const { response } = requestInfo;

            const responseData = await response.json();
            return responseData.data;
        }
    })
};
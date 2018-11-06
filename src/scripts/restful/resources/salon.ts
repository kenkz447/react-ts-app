import { Record, Resource, ResourceType } from 'react-restful';

export interface Salon extends Record {
    readonly id: number;
}

export const salonResourceType = new ResourceType<Salon>('Salon');

export const salonResources = {
    getById: new Resource<Salon[]>({
        resourceType: salonResourceType,
        url: '/Salons/:id'
    })
};
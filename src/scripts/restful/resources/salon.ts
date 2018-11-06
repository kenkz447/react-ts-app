import { Record, Resource, ResourceType } from 'react-restful';

export interface Salon extends Record {
    readonly id: number;
}

export const salonResourceType = new ResourceType<Salon>({
    name: nameof<Salon>(),
    schema: [{
        field: 'id',
        type: 'PK'
    }]
});

export const salonResources = {
    getById: new Resource<Salon[]>({
        resourceType: salonResourceType,
        url: '/Salons/:id'
    })
};
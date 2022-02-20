import { v4 as uuid } from 'uuid';

export const appointments = [
    {
        id: uuid(),
        ref: 'CDD1049',
        patient: 'Ekaterina Tankova',
        createdAt: 1555016400000,
        status: 'Ongoing'
    },
    {
        id: uuid(),
        ref: 'CDD1048',
        patient: 'Cao Yu',
        createdAt: 1555016400000,
        status: 'Finished'
    },
    {
        id: uuid(),
        ref: 'CDD1047',
        patient: 'Alexa Richardson',
        createdAt: 1554930000000,
        status: 'Canceled'
    },
    {
        id: uuid(),
        ref: 'CDD1046',
        patient: 'Anje Keizer',
        createdAt: 1554757200000,
        status: 'Ongoing'
    },
    {
        id: uuid(),
        ref: 'CDD1045',
        patient: 'Clarke Gillebert',
        createdAt: 1554670800000,
        status: 'Finished'
    },
    {
        id: uuid(),
        ref: 'CDD1044',
        patient: 'Adam Denisov',
        createdAt: 1554670800000,
        status: 'Finished'
    }
];
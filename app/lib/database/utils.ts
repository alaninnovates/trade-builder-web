import { WithoutId } from 'mongodb';

// Remove _id from find result
export const withoutId = <T extends { _id: any }>(obj: T): WithoutId<T> => {
    const { _id, ...rest } = obj;
    return rest;
};

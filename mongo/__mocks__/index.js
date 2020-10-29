import 'regenerator-runtime/runtime';

const mongodb = jest.createMockFromModule('mongodb');
export const deleteMany = jest.fn(async () => {});
export const insertMany = jest.fn(async () => {});
export const close = jest.fn();

const collection = { deleteMany, insertMany };

export const database = { collection: () => collection };

const client = { db: () => database, close };

export const connect = jest.fn(async () => client);

mongodb.connect = connect;

export default mongodb;

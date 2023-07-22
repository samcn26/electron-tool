import { getDataCollection } from '../db/init';

export type ApiType = 'create' | 'read' | 'update' | 'del';
export type CrudArgs = {
  db: string;
  data?: any;
  query?: any;
};
export type InputArgs = CrudArgs & { type: ApiType };
type CrudFunction = (args: CrudArgs) => Promise<any>;

const create: CrudFunction = async ({ db, data }) => {
  return new Promise((resolve, reject) => {
    const collection = getDataCollection(db);
    const doc = collection.insert(data);

    if (doc) {
      resolve(doc);
    } else {
      reject(new Error('Failed to insert document.'));
    }
  });
};

const read: CrudFunction = ({ db, query }) => {
  return new Promise((resolve, reject) => {
    const collection = getDataCollection(db);
    const docs = collection.find(query);
    if (docs.length > 0) {
      resolve(docs);
    } else {
      reject(new Error('No documents found for the given query.'));
    }
  });
};

const update: CrudFunction = ({ db, query, data }) => {
  return new Promise((resolve, reject) => {
    const collection = getDataCollection(db);
    const docs = collection.update(query, data);
    if (docs.length > 0) {
      resolve(docs);
    } else {
      reject(new Error('No documents found for the given query.'));
    }
  });
};

const del: CrudFunction = ({ db, query }) => {
  return new Promise((resolve, reject) => {
    const collection = getDataCollection(db);
    const docs = collection.remove(query);
    if (docs.length > 0) {
      resolve(docs);
    } else {
      reject(new Error('No documents found for the given query.'));
    }
  });
};

const CRUD: { [key in ApiType]: CrudFunction } = { create, read, update, del };

export default CRUD;

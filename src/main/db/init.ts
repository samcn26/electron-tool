import Loki from 'lokijs';
import { app } from 'electron';
import path from 'path';

let db: any;

const collections = {
  Observation: 'ServiceRequest.orderId',
  Order: 'ServiceRequest.orderId',
  Config: 'app',
};

function databaseInitialize() {
  const dbPath = path.join(app.getPath('userData'), 'database.json');
  return new Promise<void>((resolve) => {
    db = new Loki(dbPath, {
      autoload: true,
      autoloadCallback: () => {
        Object.entries(collections).forEach(([collectionName, index]) => {
          const collection = db.getCollection(collectionName);
          if (collection === null) {
            db.addCollection(collectionName, {
              indices: [index],
            });
          }
        });
        resolve();
      },
      autosave: true,
      autosaveInterval: 4000,
    });
  });
}

function closeDatabase() {
  return new Promise<void>((resolve, reject) => {
    if (db) {
      db.saveDatabase((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

function getDataCollection(collection: string) {
  return db.getCollection(collection);
}

export { databaseInitialize, closeDatabase, getDataCollection };

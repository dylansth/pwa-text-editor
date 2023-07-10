import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb Requested');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request =  store.put({ id: 1, value: content });
  await request;
  tx.oncomplete;
  console.log('putDb Successful.')
}

// Gets all the content from the database
export const getDb = async () => {
  console.log('getDB Requested');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = store.get(1);
  await content;
  tx.oncomplete;
  console.log('getDB Successful')
}

initdb();

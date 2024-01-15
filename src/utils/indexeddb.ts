import { openDB } from 'idb';

const DB_NAME = 'your-database-name';
const DB_VERSION = 1;
const STORE_NAME = 'your-store-name';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export async function getData<T>(key: string): Promise<T[]> {
  try {
    const db = await dbPromise;
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const result = await store.get(key);
    return result ? result : []; 
  } catch (error) {
    console.error('Error retrieving data from IndexedDB:', error);
    return [];
  }
}

export async function saveData<T>(key: string, data: T[]): Promise<void> {
  try {
    const db = await dbPromise;
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(data, key);

    await new Promise((resolve) => transaction.oncomplete = resolve);
  } catch (error) {
    console.error('Error saving data to IndexedDB:', error);
  }
}

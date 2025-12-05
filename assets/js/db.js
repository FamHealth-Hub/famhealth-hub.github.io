// assets/js/db.js – 100% sicher
const DB_NAME = "FamHealthHub";
const DB_VERSION = 3;
let dbPromise;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('patients')) db.createObjectStore('patients', { keyPath: 'id', autoIncrement: true });
      if (!db.objectStoreNames.contains('vitals'))   db.createObjectStore('vitals',   { keyPath: 'id', autoIncrement: true });
      if (!db.objectStoreNames.contains('exams'))    db.createObjectStore('exams',    { keyPath: 'id', autoIncrement: true });
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};

dbPromise = openDB();

// Helfer
const getAll = storeName => dbPromise.then(db => {
  return new Promise(res => {
    const tx = db.transaction(storeName);
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
  });
});

const add = (storeName, data) => dbPromise.then(db => {
  return new Promise(res => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.add(data);
    req.onsuccess = () => res(req.result);
  });
});

const getAllPatients = () => getAll('patients');
const addPatient = patient => add('patients', patient);
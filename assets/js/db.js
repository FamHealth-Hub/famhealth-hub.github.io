const DB_NAME = "FamHealthHub";
const DB_VERSION = 1;

let db;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      db.createObjectStore("data", { keyPath: "id" });
    };
  });
};

const getStore = (mode = "readonly") => {
  const tx = db.transaction("data", mode);
  return tx.objectStore("data");
};

const get = (key) => {
  return new Promise((resolve) => {
    const store = getStore();
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result?.value);
  });
};

const set = (key, value) => {
  return new Promise((resolve) => {
    const store = getStore("readwrite");
    store.put({id: key, value});
    resolve();
  });
};

initDB();
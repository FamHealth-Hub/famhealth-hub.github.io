// assets/js/db.js
const DB_NAME = "FamHealthHub";
const DB_VERSION = 2;
let db;

const initDB = () => new Promise((resolve, reject) => {
  const req = indexedDB.open(DB_NAME, DB_VERSION);

  req.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("patients", { keyPath: "id", autoIncrement: true });
    db.createObjectStore("vitals",   { keyPath: "id", autoIncrement: true });
    db.createObjectStore("exams",    { keyPath: "id", autoIncrement: true });
  };

  req.onsuccess = () => { db = req.result; resolve(db); };
  req.onerror = () => reject(req.error);
});

const getStore = (name, mode = "readonly") => {
  const tx = db.transaction(name, mode);
  return tx.objectStore(name);
};

// Patienten
const getAllPatients = () => new Promise(res => {
  const store = getStore("patients");
  const req = store.getAll();
  req.onsuccess = () => res(req.result);
});

const addPatient = patient => new Promise(res => {
  const store = getStore("patients", "readwrite");
  const req = store.add(patient);
  req.onsuccess = () => res(req.result);
});

// Vitals & Exams kommen in Phase 5/6
initDB();
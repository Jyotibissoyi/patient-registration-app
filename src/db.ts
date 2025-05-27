import initSqlJs from 'sql.js';

export let db: any;
export const saveToLocalStorage = () => {
  return localStorage.getItem('patient_db');
}
export const setupDb = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`,
  });

  const savedDb = localStorage.getItem('patient_db');
  db = savedDb
    ? new SQL.Database(Uint8Array.from(atob(savedDb), c => c.charCodeAt(0)))
    : new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      contact TEXT NOT NULL,
      address TEXT
    );
  `);
  saveDB()
};

export const saveDB = () => {
  const data = db.export();
  const base64 = btoa(String.fromCharCode(...data));
  localStorage.setItem('patient_db', base64);
};

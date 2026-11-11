const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./agroadvisor.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_kn TEXT,
    name_hi TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_id INTEGER,
    name TEXT NOT NULL,
    name_kn TEXT,
    name_hi TEXT,
    FOREIGN KEY (crop_id) REFERENCES crops(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS remedies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pest_id INTEGER,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    description_kn TEXT,
    description_hi TEXT,
    FOREIGN KEY (pest_id) REFERENCES pests(id)
  )`);

  console.log('Database ready with multilingual columns!');
});

module.exports = db;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./event.db');

const createTables = () => {
  db.run(`PRAGMA foreign_keys = ON`);

  db.run(`CREATE TABLE IF NOT EXISTS Actor (
    id INTEGER NOT NULL PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Repo (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    url  TEXT NOT NULL
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS Event (
    id INTEGER NOT NULL PRIMARY KEY,
    type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    actorId  INTEGER NOT NULL REFERENCES Actor(id) ON DELETE CASCADE,
    repoId  INTEGER NOT NULL REFERENCES Repo(id) ON DELETE CASCADE
    )`);
};

module.exports = {
  init: createTables,
  db: db
};

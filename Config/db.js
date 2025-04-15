const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('freelancer-bros.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database.');
    checkAndCreateUsersTable();
  }
});

let usersTableCreated = false

function checkAndCreateUsersTable() {
  if (!usersTableCreated) {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        user_profile TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "users" created successfully.');
        usersTableCreated = true; // Set the flag to true after successful creation
      }
    });
  } else {
    console.log('Table "users" already exists.');
  }
}


module.exports = db;
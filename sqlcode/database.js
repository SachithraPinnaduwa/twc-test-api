import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('contacts.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
    return;
  }
  console.log('Connected to the database.');
});

const sqlCreate = `
CREATE TABLE IF NOT EXISTS contacts (
  full_name TEXT,
  gender TEXT,
  email TEXT PRIMARY KEY,
  phone TEXT
)`;

db.run(sqlCreate, (err) => {
  if (err) {
    console.error('Error creating table: ', err);
    return;
  }
  console.log('Table created.');
});

function insertContact(full_name, gender, email, phone, callback) {
    const sqlInsert = `
    INSERT INTO contacts (full_name, gender, email, phone) VALUES (?, ?, ?, ?)`;
    
    db.run(sqlInsert, [full_name, gender, email, phone], (err) => {
      callback(err);
    });
  }
  

function getAllContacts(callback) {
    const sqlGetAll = `SELECT * FROM contacts`;
    db.all(sqlGetAll, [], (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, rows);
    });
  }

function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database: ', err);
      return;
    }
    console.log('Database connection closed.');
  });
}

function deleteContact(email, callback) {
    const sqlDelete = `DELETE FROM contacts WHERE email = ?`;
    
    db.run(sqlDelete, [email], function(err) {
        if (err) {
            console.error('Error deleting contact:', err);
            callback(err);
            return;
        }
        console.log(`Contact deleted: ${email}`);
        callback(null, { message: `Contact deleted: ${email}`, changes: this.changes });
    });
}

export { insertContact, closeDatabase,getAllContacts,deleteContact };

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'
import { insertContact, closeDatabase, getAllContacts,deleteContact } from './database.js';

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(morgan('dev'));    // Logger
app.use(cors());
app.get('/contacts', (req, res) => {
  getAllContacts((err, contacts) => {
    if (err) {
      res.status(500).send('Failed to retrieve contacts');
      return;
    }
    res.json(contacts);
  });
});

app.post('/contacts', (req, res) => {
  const { full_name, gender, email, phone } = req.body;
  if (!full_name || !gender || !email || !phone) {
    res.status(400).send('Missing required fields');
    return;
  }
  insertContact(full_name, gender, email, phone, (err) => {
    if (err) {
      res.status(500).send(`Error adding contact: ${err.message}`);
      return;
    }
    res.status(201).send('Contact added');
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
  
app.post('/data', (req, res) => {
  res.json({
    message: 'Data received',
    data: req.body
  });
});


app.delete('/contacts/:email', (req, res) => {
  const { email } = req.params;
  deleteContact(email, (err, result) => {
      if (err) {
          res.status(500).send(`Error deleting contact: ${err.message}`);
          return;
      }
      if (result.changes === 0) {
          res.status(404).send('No contact found with that email.');
      } else {
          res.send(result);
      }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  closeDatabase();
  process.exit();
});

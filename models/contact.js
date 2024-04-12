import mongoose from 'mongoose';

// Defining the contact schema
const contactSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email serves as a primary key in the SQL table, so it should be unique
  },
  phone: {
    type: String,
    required: true,
  },
});

// Creating the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Exporting the Contact model
export { Contact };

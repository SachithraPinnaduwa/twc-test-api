import mongoose from 'mongoose';

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
    unique: true, 
  },
  phone: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Creating the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Exporting the Contact model
export { Contact };

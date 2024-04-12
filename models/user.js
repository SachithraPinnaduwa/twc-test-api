// UserSchema.js
import mongoose from 'mongoose';

// Defining the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating the User model
const User = mongoose.model('User', userSchema);

// Exporting the User model
export { User };

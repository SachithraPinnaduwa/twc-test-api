
import { User } from './models/user.js';

// Function to add a new user
export const addUser = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
  return user;
};

// Function to retrieve all users
export const getAllUsers = async () => {
  return await User.find({});
};

// Function to delete a user by email
export const deleteUser = async (email) => {
  const result = await User.deleteOne({ email });
  return result;
};

export const getUser = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    return null;
  }
  if (user.password === password) {
    return user;
  }
};


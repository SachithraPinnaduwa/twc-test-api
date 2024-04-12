// mongodb.js
import { Contact } from './models/contact.js';

export const insertContact = async (full_name, gender, email, phone) => {
  try {
    const contact = new Contact({ full_name, gender, email, phone });
    await contact.save();
    return contact;
  } catch (error) {
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    return await Contact.find({});
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (email) => {
  try {
    const result = await Contact.deleteOne({ email });
    return result;
  } catch (error) {
    throw error;
  }
};

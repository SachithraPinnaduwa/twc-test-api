// mongodb.js
import { Contact } from './models/contact.js';

export const insertContact = async (userId, full_name, gender, email, phone) => {
  try {
    const contact = new Contact({
      full_name,
      gender,
      email,
      phone,
      user: userId  
    });
    await contact.save();
    return contact;
  } catch (error) {
    throw error;
  }
};

export const getAllContacts = async (userId = null) => {
  try {
    const query = userId ? { user: userId } : {};
    return await Contact.find(query);
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (email, userId) => {
  try {
    const result = await Contact.deleteOne({ email, user: userId });
    return result;
  } catch (error) {
    throw error;
  }
};


export const updateContact = async (email, full_name, gender, phone) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { email }, // find a document by email
      {
        full_name,
        gender,
        phone
      },
      { new: true } // option to return the updated document
    );
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

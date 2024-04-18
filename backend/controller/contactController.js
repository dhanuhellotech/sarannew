// controllers/contactController.js
const Contact = require('../Model/Contact');

// Create a new contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };

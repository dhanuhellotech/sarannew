// models/Contact.js
const mongoose = require('mongoose');

const categoryOptions = ['General Inquiry', 'Booking', 'Feedback', 'Complaint','other'];

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: categoryOptions,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

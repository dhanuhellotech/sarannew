// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Route to create a new contact
router.post('/', contactController.createContact);

// Route to get all contacts
router.get('/', contactController.getContacts);

// Route to update a contact
router.put('/:id', contactController.updateContact);

// Route to delete a contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;

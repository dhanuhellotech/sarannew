const express = require('express');
const router = express.Router();
const tourFormController = require('../controller/tourFormController');

// Submit a new tour form
router.post('/submit', tourFormController.submitTourForm);
// Example endpoint to add a new tour package
router.post('/add-package',tourFormController.addTourPackage);

// Get all tour forms
router.get('/get', tourFormController.getAllTourForms);

// Get a single tour form by ID
router.get('/:id', tourFormController.getTourFormById);

// Update a tour form by ID
// Update a tour form by ID
router.put('/update/:id', tourFormController.updateTourForm);


// Delete a tour form by ID
router.delete('/:id', tourFormController.deleteTourForm);

module.exports = router;

const express = require('express');
const router = express.Router();
const tourFormController = require('../controller/tourFormController');
const tourModelController = require('../controller/tourController');
// Submit a new tour form
router.post('/submit', tourFormController.submitTourForm);
// Example endpoint to add a new tour package
router.post('/add-package',tourFormController.addTourPackage);

// Get all tour forms
router.get('/get', tourFormController.getAllTourForms);

// Get a single tour form by ID
router.get('/:id', tourFormController.getTourFormById);

// Update a tour form by ID
// Update a tour form by IDa
router.put('/update/:id', tourFormController.updateTourForm);


// Delete a tour form by ID
router.delete('/:id', tourFormController.deleteTourForm);



// / /Create a new tour package model
router.post('/tour-models', tourModelController.createTourModel);

// Get all tour package models
router.get('/', tourModelController.getAllTourModels);

// Update a tour package model by ID
router.put('/tour-models/:id', tourModelController.updateTourModel);

// Delete a tour package model by ID
router.delete('/tour-models/:id', tourModelController.deleteTourModel);
module.exports = router;

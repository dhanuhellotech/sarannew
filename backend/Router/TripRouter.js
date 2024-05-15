// routes/vehicleRouter.js
const express = require('express');
const router = express.Router();
const TripController = require('../controller/TripController');

// Define your vehicle routes here
router.get('/', TripController.getAllVehicles);
router.post('/', TripController.uploadImage, TripController.resizeImage, TripController.addImagetoCloud, TripController.createVehicle);
router.put('/:id', TripController.uploadImage, TripController.resizeImage, TripController.addImagetoCloud, TripController.updateVehicle);
router.get('/:id', TripController.getVehicleById);
router.delete('/:id', TripController.deleteVehicle);

module.exports = router;

const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/vehicleController');
const vehimodController = require('../controller/vehimodController')
// Routes for vehicle details
router.post('/vehicles', vehicleController.createVehicle);
router.get('/vecget', vehicleController.getAllVehicles);
router.get('/vehicles/:id', vehicleController.getVehicleById);
router.put('/vehicles/:id', vehicleController.updateVehicle);
router.delete('/vehicles/:id', vehicleController.deleteVehicle);
//
// Routes for vehicle models
router.post('/vehicle-models', vehimodController.createVehicleModel);
router.get('/vehicle-models', vehimodController.getAllVehicleModels);
router.put('/vehicle-models/:id', vehimodController.updateVehicleModel);
router.delete('/vehicle-models/:id', vehimodController.deleteVehicleModel);
module.exports = router;

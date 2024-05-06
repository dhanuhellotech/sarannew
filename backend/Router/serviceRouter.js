// routers/serviceRouter.js

const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');

// Define your service routes here
router.post('/', serviceController.uploadImage, serviceController.resizeImage, serviceController.addImagetoCloud, serviceController.createService);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.uploadImage, serviceController.resizeImage, serviceController.addImagetoCloud, serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.get('/', serviceController.getAllServices); // Route to fetch all services

module.exports = router;

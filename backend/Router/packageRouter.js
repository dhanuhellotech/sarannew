// routes/packageRouter.js

const express = require('express');
const router = express.Router();
const packageController = require('../controller/packageController');

// Define your package routes here
router.get('/', packageController.getAllPackages);
router.put('/:id', packageController.uploadImage, packageController.resizeImage, packageController.addImagetoCloud, packageController.updatePackage);
router.post('/', packageController.uploadImage, packageController.resizeImage, packageController.addImagetoCloud, packageController.createPackage);
router.delete('/:id', packageController.deletePackage);
router.get('/:id', packageController.getPackageById);
module.exports = router;

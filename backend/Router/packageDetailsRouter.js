const express = require('express');
const router = express.Router();
const packageDetailsController = require('../controller/packageDetailsController');

// Define your package details routes here
router.post('/', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.createPackageDetails);
router.put('/:id', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.updatePackageDetails);
router.get('/:id', packageDetailsController.getPackageDetailsById);
router.delete('/:id', packageDetailsController.deletePackageDetails);

module.exports = router;

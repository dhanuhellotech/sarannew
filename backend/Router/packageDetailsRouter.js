const express = require('express');
const router = express.Router();
const packageDetailsController = require('../controller/packageDetailsController');

router.post('/', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.createPackageDetails);
router.put('/:id', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.updatePackageDetails);
router.get('/:id', packageDetailsController.getPackageDetailsById);
router.delete('/:id', packageDetailsController.deletePackageDetails);
router.get('/', packageDetailsController.getPackageDetails);

module.exports = router;

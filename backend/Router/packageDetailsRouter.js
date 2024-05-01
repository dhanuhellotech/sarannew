const express = require('express');
const router = express.Router();
const mergeController = require('../controller/mergeController');
const packageDetailsController = require('../controller/packageDetailsController');

// Define your package detail routes here
router.post('/', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.createPackageDetails);
router.put('/:id', packageDetailsController.uploadImage, packageDetailsController.resizeImage, packageDetailsController.addImagetoCloud, packageDetailsController.updatePackageDetails);
router.get('/:id', packageDetailsController.getPackageDetailsById);
router.delete('/:id', packageDetailsController.deletePackageDetails);
router.get('/', packageDetailsController.getPackageDetails);

// Route for merging package and package detail data
// router.get('/package/:name/details', async (req, res) => {
//     console.log(req.params.name)
//     try {
//         const packageName = req.params.name;
  
//         // Use merge controller function to get merged data
//         const mergedData = await mergeController.mergePackageData(packageName);
  
//         // Return merged data as JSON response
//         res.json(mergedData);
//     } catch (error) {
//         console.error("Error fetching package details:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

module.exports = router;

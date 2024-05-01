// routes/packageRouter.js

const express = require('express');
const router = express.Router();
const packageController = require('../controller/packageController');
const mergeController = require('../controller/mergeController');

// Define your package routes here
router.get('/', packageController.getAllPackages);
router.put('/:id', packageController.uploadImage, packageController.resizeImage, packageController.addImagetoCloud, packageController.updatePackage);
router.post('/', packageController.uploadImage, packageController.resizeImage, packageController.addImagetoCloud, packageController.createPackage);
router.delete('/:id', packageController.deletePackage);
router.get('/:id', packageController.getPackageById);
router.get('/package/:name/details', async (req, res) => {
    console.log(req.params.name)
    try {
      const packageName = req.params.name;
  
      // Use merge controller function to get merged data
      const mergedData = await mergeController.mergePackageData(packageName);
  
      // Return merged data as JSON response
      res.json(mergedData);
    } catch (error) {
      console.error("Error fetching package details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mergeController = require('../controller/mergeController');

router.get('/package/:name/details', async (req, res) => {
    console.log(req.params.name)
    try {
      const packageName = req.params.name;
  
      // Query both models based on package name
      const packageData = await Package.findOne({ name: packageName }).exec();
      const packageDetailsData = await PackageDetails.findOne({ name: packageName }).exec();
  
      // Merge data from both models
      const mergedData = {
        package: packageData,
        packageDetails: packageDetailsData
      };
  
      // Return merged data as JSON response
      res.json(mergedData);
    } catch (error) {
      console.error("Error fetching package details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports = router;

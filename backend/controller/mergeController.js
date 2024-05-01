// mergeController.js
const Package = require('../Model/Package');
const PackageDetails = require('../Model/packageDetailsModel');

async function mergePackageData(packageName) {
  try {
    const packageData = await Package.findOne({ name: packageName }).exec();
    const packageDetailsData = await PackageDetails.findOne({ name: packageName }).exec();

    return {
      package: packageData,
      packageDetails: packageDetailsData
    };
  } catch (error) {
    console.error("Error merging package data:", error);
    throw error;
  }
}
module.exports = {
  mergePackageData
};

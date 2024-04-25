const PackageDetails = require('../Model/packageDetailsModel');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

const uploadImage = multer.single('image');

const resizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(); // If no file uploaded, move to next middleware
    }

    const resizedImage = await sharp(req.file.buffer)
      .resize(300, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();

    req.image = resizedImage.toString('base64');
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error resizing image" });
  }
};

const addImagetoCloud = async (req, res, next) => {
  try {
    if (!req.image) {
      return next(); // If no image resized, move to next middleware
    }

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "packages" // Make sure the folder parameter is set to "packages"
    });

    if (!result || !result.public_id) {
      throw new Error("Invalid result object or missing public_id");
    }

    req.result = result;
    
    req.publicId = result.public_id; // Assign the public_id property to req.publicId
    next();
  } catch (err) {
    console.error('Error uploading image to cloud:', err);
    return res.status(500).json({ message: "Error uploading image to Cloudinary. Please try again later." });
  }
};
const createPackageDetails = async (req, res) => {
    try {
      const { name, description, numberOfDays, numberOfPersons, includes, excludes, services } = req.body;
      let { daysWithDescription } = req.body;

      // Parse daysWithDescription if it's received as a JSON string
      if (typeof daysWithDescription === 'string') {
        daysWithDescription = JSON.parse(daysWithDescription);
      }
  
      let newPackageDetailsData = {
        name,
        description,
        numberOfDays,
        numberOfPersons,
        daysWithDescription,
        includes,
        excludes,
        services,
        image: req.result.secure_url,
      };
  
      if (req.result) {
        newPackageDetailsData.pid = req.result.public_id;
        newPackageDetailsData.imageUrl = req.result.secure_url; // Assigning imageUrl here
      }
  
      const newPackageDetails = new PackageDetails(newPackageDetailsData);
  
      await newPackageDetails.save();
      res.status(201).json(newPackageDetails);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  

  const updatePackageDetails = async (req, res) => {
    try {
      const packageDetailsId = req.params.id;
      const { name, description, numberOfDays, numberOfPersons, daysWithDescription, includes, excludes, services } = req.body;
  
      let updatedPackageDetailsData = {};
  
      if (name) {
        updatedPackageDetailsData.name = name;
      }
      if (description) {
        updatedPackageDetailsData.description = description;
      }
      if (numberOfDays) {
        updatedPackageDetailsData.numberOfDays = numberOfDays;
      }
      if (numberOfPersons) {
        updatedPackageDetailsData.numberOfPersons = numberOfPersons;
      }
      if (daysWithDescription) {
        updatedPackageDetailsData.daysWithDescription = daysWithDescription;
      }
      if (includes) {
        updatedPackageDetailsData.includes = includes;
      }
      if (excludes) {
        updatedPackageDetailsData.excludes = excludes;
      }
      if (services) {
        updatedPackageDetailsData.services = services;
      }
  
      if (req.result) {
        updatedPackageDetailsData.image = req.result.secure_url ? req.result.secure_url : undefined;
        updatedPackageDetailsData.imageUrl = req.result.secure_url ? req.result.secure_url : undefined;
      }
  
      const updatedPackageDetails = await PackageDetails.findByIdAndUpdate(
        packageDetailsId,
        { $set: updatedPackageDetailsData },
        { new: true }
      );
  
      if (!updatedPackageDetails) {
        return res.status(404).json({ message: 'Package details not found' });
      }
      res.json(updatedPackageDetails);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
  const getPackageDetailsById = async (req, res) => {
    try {
      const packageDetailsId = req.params.id;
      const packageDetails = await PackageDetails.findById(packageDetailsId);
      if (!packageDetails) {
        return res.status(404).json({ message: 'Package details not found' });
      }
      res.json(packageDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const deletePackageDetails = async (req, res) => {
  try {
    const packageDetailsId = req.params.id;
    const deletedPackageDetails = await PackageDetails.findByIdAndDelete(packageDetailsId);
    if (!deletedPackageDetails) {
      return res.status(404).json({ message: 'Package details not found' });
    }
    res.json({ message: 'Package details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackageDetails,
  updatePackageDetails,
  deletePackageDetails,
  uploadImage,
  resizeImage,
  addImagetoCloud,
  getPackageDetailsById,
};
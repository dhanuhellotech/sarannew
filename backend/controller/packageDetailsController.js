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
    let { days } = req.body;

    let newPackageDetailsData = {
      name,
      description,
      numberOfDays,
      numberOfPersons,
      days,
      includes,
      excludes,
      services,
      imageUrl: req.result.secure_url,
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

const getPackageDetails = async (req, res) => {
  try {
    const packageDetails = await PackageDetails.find();
    res.json(packageDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePackageDetails = async (req, res) => {
  try {
    const packageDetailsId = req.params.id;
    const { name, description, numberOfDays, numberOfPersons, days, includes, excludes, services } = req.body;

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
    if (days) {
      updatedPackageDetailsData.days = days;
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

    // Upload image to Cloudinary if exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "packages" // Make sure the folder parameter is set to "packages"
      });

      if (!result || !result.secure_url) {
        throw new Error("Invalid result object or missing secure_url");
      }

      updatedPackageDetailsData.imageUrl = result.secure_url;
      updatedPackageDetailsData.publicId = result.public_id; // Optionally, you can store the public_id for deletion
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
    console.error('Error updating package details:', error);
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
  getPackageDetails,
};

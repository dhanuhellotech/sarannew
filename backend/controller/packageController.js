// controllers/packageController.js

const Package = require('../Model/Package');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

const uploadImage = multer.single('image');

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const createPackage = async (req, res) => {
    try {
      const { name, stars, price, description, briefDescription } = req.body;
  
      let newPackageData = {
        name,
        stars,
        price,
        description,
        briefDescription,
      };
  
      if (req.result) {
        newPackageData.pid = req.result.public_id;
        newPackageData.imageUrl = req.result.secure_url; // Assigning imageUrl here
      }
  
      const newPackage = new Package(newPackageData);
  
      await newPackage.save();
      res.status(201).json(newPackage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { name, stars, price, description, briefDescription } = req.body;

    if (!name || !stars || !price || !description || !briefDescription) {
      return res.status(400).json({ message: 'All fields are required for updating a package' });
    }

    let updatedPackageData = {
      name,
      stars,
      price,
      description,
      briefDescription,
    };

    if (req.result) {
      updatedPackageData.image = req.result.secure_url ? req.result.secure_url : undefined;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      updatedPackageData,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
  uploadImage,
  resizeImage,
  addImagetoCloud
};

// controllers/vehicleController.js

const Vehicle = require('../Model/Tripvechicle');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

const uploadImage = multer.single('image');

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
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
      folder: "vehicles" // Make sure the folder parameter is set to "vehicles"
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

const createVehicle = async (req, res) => {
  try {
    const { name, price, driverAllowance, oneWayTrip, roundTrip, state, permit, tollGates } = req.body;

    const newVehicle = new Vehicle({
      name,
      price,
      driverAllowance,
      oneWayTrip,
      roundTrip,
      state,
      permit,
      tollGates,
      image: req.result.secure_url, // Assuming you've already implemented image upload
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { name, price, driverAllowance, oneWayTrip, roundTrip, state, permit, tollGates } = req.body;

    // Validate required fields
    if (!name || !price || !driverAllowance || !state) {
      return res.status(400).json({ message: 'All fields are required for updating a vehicle' });
    }

    let updatedVehicleData = {
      name,
      price,
      driverAllowance,
      oneWayTrip,
      roundTrip,
      state,
      permit,
      tollGates
    };

    // If image is uploaded, update image URL
    if (req.result) {
      updatedVehicleData.image = req.result.secure_url ? req.result.secure_url : undefined;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      updatedVehicleData,
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  uploadImage,
  resizeImage,
  addImagetoCloud,
  getVehicleById,
};
    
// controllers/serviceController.js
const Service = require('../Model/Service');
const multer = require('../middleware/upload');
const sharp = require("sharp");
const cloudinary = require("../middleware/cloudinary");

// Middleware for uploading image
const uploadImage = multer.single('image');

// Middleware for resizing image
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

// Middleware for uploading image to Cloudinary
const addImagetoCloud = async (req, res, next) => {
  try {
    if (!req.image) {
      return next(); // If no image resized, move to next middleware
    }

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`, {
      folder: "services" // Make sure the folder parameter is set to "services"
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

// Controller to get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new service
const createService = async (req, res) => {
  try {
    const { category, serviceName, servicePrice, description, briefDescription } = req.body;
    const newServiceData = {
      category,
      services: [{
        serviceName,
        image: req.result.secure_url,
        servicePrice,
        description,
        briefDescription
      }]
    };

    if (req.result) {
      newServiceData.services[0].image = req.result.secure_url;
    }

    const newService = new Service(newServiceData);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
    try {
      console.log('Request body:', req.body);
      
      const serId = req.params.serId
      const serviceId = req.params.id;

  
      const { serviceName, image, servicePrice, description, briefDescription, category } = req.body;
  
      
  
      let updatedServiceData = {
        serviceName,
        servicePrice,
        description,
        briefDescription,
        category,
        image:req.result.secure_url
      }; 
  
      // If image is provided in the request body, update it
      
  
      // Optionally, if you're updating the category too:
      // updatedServiceData.category = category;
  
      // Update the service in the database
      const updatedService = await Service.findOneAndUpdate(
        {_id:serviceId,'services._id':serId},
        { $set:{"services.$":updatedServiceData} },
        { new: true }
      );
  
      console.log('Updated service:', updatedService);
  
      if (!updatedService) {
        console.log('Service not found');
        return res.status(404).json({ message: 'Service not found' });
      }
  
      res.json(updatedService);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  
  // Controller to delete a service by ID
  const deleteService = async (req, res) => {
    try {
      const serviceId = req.params.id;
      const deletedService = await Service.findByIdAndDelete(serviceId);
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
const getServiceById = async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
  uploadImage,
  resizeImage,
  getServiceById,
  addImagetoCloud
};

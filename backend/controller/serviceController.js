  // controllers/serviceController.js

  const Service = require('../Model/Service');
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
        .jpeg({ quality: 90 })
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

  const createService = async (req, res) => {
    try {
      const { serviceName, servicePrice, description, briefDescription, categoryName } = req.body;

      let newServiceData = {
        categoryName,
        serviceName,
        servicePrice,
        description,
        briefDescription
      };

      if (req.result) {
        newServiceData.image = req.result.secure_url;
        newServiceData.imagePublicId = req.result.public_id;
      }

      const newService = new Service(newServiceData);

      await newService.save();
      res.status(201).json(newService);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getServiceById = async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateService = async (req, res) => {
    try {
      const serviceId = req.params.id;
      const { serviceName, servicePrice, description, briefDescription, categoryName } = req.body;

      // Check if there's a new image to upload
      let newImage;
      if (req.result) {
        newImage = {
          image: req.result.secure_url,
          imagePublicId: req.result.public_id
        };
      }

      // Construct updated service data
      let updatedServiceData = {
        serviceName,
        servicePrice,
        description,
        briefDescription,
        categoryName,
        ...(newImage && newImage), // Spread the new image object if it exists
      };

      // Find and update the service
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        updatedServiceData,
        { new: true }
      );

      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json(updatedService);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const getAllServices = async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


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

  module.exports = {
    createService,
    uploadImage,
    resizeImage,
    addImagetoCloud,
    getServiceById,
    updateService,
    deleteService,
    getAllServices,
  };

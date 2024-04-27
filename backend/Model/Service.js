// models/Service.js
const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true }, // Name of the service
    image: { type: String, required: true }, // URL of the service image
    servicePrice: { type: Number, required: true }, // Price of the service
    description: { type: String, required: true }, // Description of the service
    briefDescription: { type: String, required: true }, // Brief description of the service
  })

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Category of the service
  services: [ServiceSchema],
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;

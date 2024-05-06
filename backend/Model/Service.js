// models/Service.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    categoryName: { type: String, required: true },
    serviceName: { type: String, required: true },
    image: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    description: { type: String, required: true },
    briefDescription: { type: String, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);

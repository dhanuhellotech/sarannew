// models/vehicleModel.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  driverAllowance: { type: Number, required: true },
  oneWayTrip: { type: String,required: true  },
  roundTrip: { type: String,required: true},
  state: { type: String },
  permit: {type: String,required: true},
  tollGates: {type: String,required: true },
});

const VehicleDetails = mongoose.model('VehicleDetails', vehicleSchema);

module.exports = VehicleDetails;

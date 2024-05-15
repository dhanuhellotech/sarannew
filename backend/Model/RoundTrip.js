// models/RoundTrip.js

const mongoose = require('mongoose');

const roundTripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  numberOfPersons: {
    type: Number,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('RoundTrip', roundTripSchema);

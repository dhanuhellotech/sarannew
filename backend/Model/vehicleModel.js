const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  vehicleModel: {
    type: String,
    // enum: ['Sedan', 'SUV', 'Truck'], // Example vehicle models, you can add more
    required: true
  },
  pickUpDate: {
    type: Date,
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;

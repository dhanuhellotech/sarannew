const mongoose = require('mongoose');

const packageDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  numberOfPersons: {
    type: Number,
    required: true
  },
  daysWithDescription: [{
    day: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  includes: {
    type: String,
    required: false
  },
  excludes: {
    type: String,
    required: false
  },
  services: {
    type: String,
    required: false
  }
});

const PackageDetails = mongoose.model('PackageDetails', packageDetailsSchema);

module.exports = PackageDetails;

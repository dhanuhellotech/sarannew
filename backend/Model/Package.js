const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  briefDescription: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;

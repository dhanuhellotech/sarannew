const mongoose = require('mongoose');

const TourModelSchema = new mongoose.Schema({
  tourPackagename: {
        type: String,
        required: true
    }
});

const TourModel = mongoose.model('TourModel', TourModelSchema); // Corrected model name

module.exports = TourModel;

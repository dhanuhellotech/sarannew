const mongoose = require('mongoose');

const vehicleModelSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true
    }
});

const VehicleModel = mongoose.model('VehicleModel', vehicleModelSchema);

module.exports = VehicleModel;

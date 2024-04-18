const Vehicle = require('../Model/vehicleModel');
const VehicleModel = require('../Model/VehicleModelSchema'); // Add this line

// Create a new vehicle model
exports.createVehicleModel = async (req, res) => {
    try {
        const { modelName } = req.body;
        const vehicleModel = new VehicleModel({ modelName });
        await vehicleModel.save();
        res.status(201).send({ message: 'Vehicle model added successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all vehicle models
exports.getAllVehicleModels = async (req, res) => {
    try {
        const vehicleModels = await VehicleModel.find();
        res.send(vehicleModels);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a vehicle model by ID
exports.updateVehicleModel = async (req, res) => {
    try {
        const { modelName } = req.body;
        const vehicleModel = await VehicleModel.findByIdAndUpdate(req.params.id, { modelName }, { new: true });
        if (!vehicleModel) {
            return res.status(404).send();
        }
        res.send(vehicleModel);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a vehicle model by ID
exports.deleteVehicleModel = async (req, res) => {
    try {
        const vehicleModel = await VehicleModel.findByIdAndDelete(req.params.id);
        if (!vehicleModel) {
            return res.status(404).send();
        }
        res.send(vehicleModel);
    } catch (error) {
        res.status(500).send(error);
    }
};

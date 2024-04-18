const Vehicle = require('../Model/vehicleModel');

// Create a new vehicle detail
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all vehicle details
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific vehicle detail by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send();
    }
    res.send(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a vehicle detail by ID
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).send();
    }
    res.send(vehicle);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a vehicle detail by ID
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).send();
    }
    res.send(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.createVehicleModel = async (req, res) => {
    try {
      const { modelName } = req.body;
      const vehicleModel = new VehicleModel({ modelName });
      await vehicleModel.save();
      res.status(201).send(vehicleModel);
    } catch (error) {
      res.status(400).send(error);
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
  exports.getAllVehicleModels = async (req, res) => {
    try {
        const vehicleModels = await VehicleModel.find();
        res.send(vehicleModels);
    } catch (error) {
        res.status(500).send(error);
    }
};

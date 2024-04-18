const Tour = require('../Model/Tour');

exports.submitTourForm = async (req, res) => {
    try {
        const tourForm = new Tour(req.body);
        await tourForm.save();
        res.status(201).json({ message: 'Tour form submitted successfully' });
    } catch (err) {
        // Check if the error is a duplicate key error
        if (err.code === 11000) { // Duplicate key error code
            res.status(200).json({ message: 'Tour form submitted successfully despite duplicate email' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
};


// Get all tour forms
exports.getAllTourForms = async (req, res) => {
  try {
    const tourForms = await Tour.find();
    res.status(200).json(tourForms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single tour form by ID
exports.getTourFormById = async (req, res) => {
  try {
    const tourForm = await Tour.findById(req.params.id);
    if (!tourForm) {
      return res.status(404).json({ error: 'Tour form not found' });
    }
    res.status(200).json(tourForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a tour form by ID
exports.updateTourForm = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTourForm = await Tour.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTourForm) {
        return res.status(404).json({ error: 'Tour form not found' });
      }
      res.status(200).json({ message: 'Tour form updated successfully', tourForm: updatedTourForm });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// Delete a tour form by ID
exports.deleteTourForm = async (req, res) => {
  try {
    const { id } = req.params;
    const tourForm = await Tour.findByIdAndDelete(id);
    if (!tourForm) {
      return res.status(404).json({ error: 'Tour form not found' });
    }
    res.status(200).json({ message: 'Tour form deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addTourPackage = async (req, res) => {
    try {
        const { packageName } = req.body;
        // Add validation if needed
        const newPackage = new TourPackage({ packageName });
        await newPackage.save();
        res.status(201).json({ message: 'Tour package added successfully', tourPackage: newPackage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

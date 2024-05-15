const TourModel = require('../Model/PackageDet');

// Create a new tour package model
exports.createTourModel = async (req, res) => {
    try {
        const { tourPackagename } = req.body;
        const tourModel = new TourModel({ tourPackagename });
        await tourModel.save();
        res.status(201).send({ message: 'Tour model added successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all tour package models
exports.getAllTourModels = async (req, res) => {
    console.log('working')
    try {
        const tourModels = await TourModel.find();
        res.send(tourModels);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a tour package model by ID
exports.updateTourModel = async (req, res) => {
    try {
        const { tourPackagename } = req.body;
        const tourModel = await TourModel.findByIdAndUpdate(req.params.id, { tourPackagename }, { new: true });
        if (!tourModel) {
            return res.status(404).send();
        }
        res.send(tourModel);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a tour package model by ID
exports.deleteTourModel = async (req, res) => {
    try {
        const tourModel = await TourModel.findByIdAndDelete(req.params.id);
        if (!tourModel) {
            return res.status(404).send();
        }
        res.send(tourModel);
    } catch (error) {
        res.status(500).send(error);
    }
};

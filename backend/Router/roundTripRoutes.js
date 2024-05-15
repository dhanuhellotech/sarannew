// routes/roundTripRoutes.js

const express = require('express');
const router = express.Router();
const roundTripController = require('../controller/roundTripController');

// Route to create a new round trip booking
router.post('/', roundTripController.createRoundTrip);
router.get('/', roundTripController.getRoundTrips);
router.delete('/:bookingId', roundTripController.deleteRoundTrip);
module.exports = router;

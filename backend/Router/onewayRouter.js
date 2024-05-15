const express = require('express');
const router = express.Router();
const onewayController = require('../controller/onewayController');

// Create a new booking
router.post('/', onewayController.createBooking);

// Get all bookings
router.get('/', onewayController.getAllBookings);
router.delete('/:id',onewayController.deleteBooking);

module.exports = router;

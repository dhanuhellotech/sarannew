    // controllers/roundTripController.js

    const RoundTrip = require('../Model/RoundTrip');

    exports.createRoundTrip = async (req, res) => {
    try {
        const roundTrip = new RoundTrip(req.body);
        await roundTrip.save();
        res.status(201).json({ message: 'Round trip booking created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    };
    exports.getRoundTrips = async (req, res) => {
        try {
          // Fetch round trip bookings from the database
          const roundTrips = await RoundTrip.find();
          
          // Send round trip bookings as a JSON response
          res.status(200).json(roundTrips);
        } catch (error) {
          // Handle errors
          console.error('Error fetching round trip bookings:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };

      exports.deleteRoundTrip = async (req, res) => {
        try {
          // Extract the booking ID from the request parameters
          const { bookingId } = req.params;
          
          // Find the round trip booking by ID and delete it
          const deletedBooking = await RoundTrip.findByIdAndDelete(bookingId);
          
          if (!deletedBooking) {
            // If the booking with the specified ID doesn't exist, return a 404 Not Found response
            return res.status(404).json({ error: 'Booking not found' });
          }
          
          // If the booking is successfully deleted, return a success message
          res.json({ message: 'Booking deleted successfully' });
        } catch (error) {
          // Handle errors
          console.error('Error deleting round trip booking:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
const express = require("express");
const router = express.Router();
const PopupController = require("../controller/PopupController");

// Create a new enquiry
router.post("/submit_enquiry", PopupController.createEnquiry);

// Get all enquiries
router.get("/enquiries", PopupController.getEnquiries);

// Delete an enquiry by ID
router.delete("/enquiries/:id", PopupController.deleteEnquiry);

module.exports = router;

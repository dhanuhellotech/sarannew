const express = require("express");
const router = express.Router();
const PopupController = require("../controller/PopupController");

// Add a new user
router.post("/submit_enquiry", PopupController.createenquiry);

module.exports = router;
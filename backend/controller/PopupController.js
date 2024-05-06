// controllers/contactController.js
const Popup = require("../Model/Popup");

// Create a new contact
const createenquiry = async (req, res) => {
  try {
    const newenquiry = new Popup(req.body);
    await newenquiry.save();
    res
      .status(201)
      .json({
        message: "enquiry form submitted successfully",
        enquiry: newenquiry,
      });
  } catch (error) {
    console.error("Error submitting enquiry form:", error);
    res.status(500).json({ error: "Failed to submit enquiry form" });
  }
};

module.exports = {
  createenquiry
};
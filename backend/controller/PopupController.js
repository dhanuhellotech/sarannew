// controllers/contactController.js
const Popup = require("../Model/Popup");

// Create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const newEnquiry = new Popup(req.body);
    await newEnquiry.save();
    res.status(201).json({
      message: "Enquiry form submitted successfully",
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Error submitting enquiry form:", error);
    res.status(500).json({ error: "Failed to submit enquiry form" });
  }
};

// Get all enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Popup.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};

// Delete an enquiry by ID
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnquiry = await Popup.findByIdAndDelete(id);
    if (!deletedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.status(200).json({
      message: "Enquiry deleted successfully",
      enquiry: deletedEnquiry,
    });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ error: "Failed to delete enquiry" });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  deleteEnquiry,
};

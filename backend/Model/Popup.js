const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({
  dateOfTravel: {
    type: String,
    required: true,
  },
  numberOfPersons: {  
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cityOfResidence: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  vacationType: {
    type: String,
    required: true,
  },
});

const Popup = mongoose.model("Popup", popupSchema);

module.exports = Popup;

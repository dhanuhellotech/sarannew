const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
guestName: {
    type: String,
    required: true,
    maxlength: 20
},
email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/ // Email regex validation
},
phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // Phone number regex validation (10 digits)
},
tourPackage: {
    type: String,
    required: true
},
message: {
    type: String,
    required: true,
    maxlength: 200
}
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

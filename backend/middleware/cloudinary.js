const cloudinary = require("cloudinary").v2
require('dotenv').config();
 cloudinary.config({
    cloud_name:"dqlvrzhda",
    api_key:"436642293726218",
    api_secret:"4WuimNmhYhwNnzavaA3Hg50UFZ8"
})

module.exports = cloudinary
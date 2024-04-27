// routes/serviceRouter.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");

// Define your service routes here
router.get("/", serviceController.getAllServices);
router.post(
  "/",
  serviceController.uploadImage,
  serviceController.resizeImage,
  serviceController.addImagetoCloud,
  serviceController.createService
);
router.put(
  "/:id/:serId",
  serviceController.uploadImage,
  serviceController.resizeImage,
  serviceController.addImagetoCloud,
  serviceController.updateService
);
router.delete("/:id", serviceController.deleteService);
router.get("/:id", serviceController.getServiceById);

module.exports = router;

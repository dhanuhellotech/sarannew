const express = require('express');
const router = express.Router();
const userController = require('../controller/topcontactController');

// Get user details
router.get('/', userController.getUserDetails);

// Add a new user
router.post('/users', userController.addUserDetails);

// Update user information
router.put('/users/:id', userController.updateUser);

// Delete user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

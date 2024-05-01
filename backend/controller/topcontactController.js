const User = require('../Model/TopContact');

// Get User details
const getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.find();
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add User details
const addUserDetails = async (req, res) => {
  console.log(req.body)
  const user = new User({
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User details
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if required fields are provided
    const { phoneNumber, email, address } = req.body;
    if (!phoneNumber || !email || !address) {
      return res.status(400).json({ message: 'All fields are required for updating User details' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        phoneNumber,
        email,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User entry not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a User entry by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User entry not found' });
    }

    res.json({ message: 'User entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserDetails,
  addUserDetails,
  updateUser,
  deleteUser
};

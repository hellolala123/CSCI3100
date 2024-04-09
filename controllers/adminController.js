const User = require('../models/userModel');

// List all users
exports.listAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords from the result
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// User registration
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already registered.');
    }

    const user = new User({ username, email, password });
    await user.save();
    req.session.userId = user._id; // Store user ID in session
    res.status(201).send({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).send('Error in Saving');
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Incorrect password.');
    }

    req.session.userId = user._id; // Store user ID in session
    res.send({ id: user._id, username: user.username });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const userId = req.session.userId; // Extract from session
    const targetUserId = req.params.userId;

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).send('User not found.');
    }

    if (!user.following.includes(targetUserId)) {
      user.following.push(targetUserId);
      await user.save();
      res.send('User followed successfully.');
    } else {
      res.send('Already following the user.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.session.userId; // Extract from session
    const targetUserId = req.params.userId;

    const user = await User.findById(userId);

    if (user.following.includes(targetUserId)) {
      user.following.pull(targetUserId);
      await user.save();
      res.send('User unfollowed successfully.');
    } else {
      res.send('Not following the user.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

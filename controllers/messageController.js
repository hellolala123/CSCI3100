const Message = require('../models/messageModel');
const User = require('../models/userModel');

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.session.userId; // Assuming the user ID is stored in session
        const message = new Message({ content, author: userId });
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send('Error creating message');
    }
};

// Like a message
exports.likeMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        message.likes += 1;
        await message.save();
        res.send('Message liked successfully');
    } catch (error) {
        res.status(500).send('Error liking message');
    }
};

// Dislike a message
exports.dislikeMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        message.dislikes += 1;
        await message.save();
        res.send('Message disliked successfully');
    } catch (error) {
        res.status(500).send('Error disliking message');
    }
};

// Comment on a message
exports.commentOnMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const messageId = req.params.messageId;
        const userId = req.session.userId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        message.comments.push({ text, author: userId });
        await message.save();
        res.send('Comment added successfully');
    } catch (error) {
        res.status(500).send('Error commenting on message');
    }
};

// Retweet a message
exports.retweetMessage = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        message.retweetCount += 1;
        await message.save();
        res.send('Message retweeted successfully');
    } catch (error) {
        res.status(500).send('Error retweeting message');
    }
};

// Fetch messages from followed users
exports.getFollowingMessages = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId).populate('following');
        const messages = await Message.find({ author: { $in: user.following } }).populate('author');
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send('Error fetching messages');
    }
};

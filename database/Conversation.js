const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;

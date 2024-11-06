const mongoose = require('mongoose');

const participantConversationSchema = new mongoose.Schema({
    participant_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true }
}, { timestamps: true });

const ParticipantConversation = mongoose.model('ParticipantConversation', participantConversationSchema);
module.exports = ParticipantConversation;

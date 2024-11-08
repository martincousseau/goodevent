const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { getCurrentUser } = require('./authController');

async function createConversation(req, res) {
    const user1 = getCurrentUser(req);
    const { title, user2Id, initialMessage } = req.body;

    try {
        // Création de la conversation
        const conversation = new Conversation({ 
            title, 
            participants: [user1._id, user2Id] 
        });
        await conversation.save();

        // Enregistrement d'un premier message
        const message = new Message({
            content: initialMessage,
            sender_id: user1._id,
            conversation_id: conversation._id
        });
        await message.save();

        res.redirect(`/conversation/${conversation._id}`);
    } catch (error) {
        console.error("Erreur lors de la création de la conversation:", error);
        res.status(500).send("Erreur interne lors de la création de la conversation.");
    }
}

async function getMessagesByConversation(conversationId) {
    try {
        const messages = await Message.find({ conversation_id: conversationId })
            .populate('sender_id', 'username')
            .sort({ sent_at: 1 });
        return messages;
    } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
        throw new Error("Erreur interne lors de la récupération des messages.");
    }
}

module.exports = { createConversation, getMessagesByConversation };
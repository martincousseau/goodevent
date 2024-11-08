const express = require('express');
const Conversation = require('../models/Conversation');
const { getMessagesByConversation,addMessage } = require('../controllers/conversationController');

const router = express.Router();

router.get('/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId).populate('participants');
    const messages = await getMessagesByConversation(conversationId);

    res.render('conversation', { conversation, messages });
});

router.get('/:conversationId/messages', getMessagesByConversation);

router.post('/:conversationId/messages', addMessage);



module.exports = router;
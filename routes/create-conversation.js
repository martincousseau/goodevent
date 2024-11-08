const express = require('express');
const { ensureAuthenticated } = require('../controllers/authController');
const { createConversation } = require('../controllers/conversationController');
const User = require('../models/User');


const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    const users = await User.find().exec()
    console.log('users: ',users)
    res.render('create-conversation', { title: 'Créer une conversation', users: users });
});

router.post('/', createConversation);

module.exports = router;

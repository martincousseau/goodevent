const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');
const { getEvents } = require('../controllers/eventController');

router.get('/', async (req, res) => {
    console.log('Rendering My Account page...');
    const user = getCurrentUser(req);
    const user_events = await getEvents(user._id);

    res.render('account', { title: 'My Account', user: user, user_events: user_events });
});


module.exports = router;

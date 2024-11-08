const express = require('express');
const { createEvent } = require('../controllers/eventController');
const { ensureAuthenticated } = require('../controllers/authController');
const router = express.Router();

router.get('/',ensureAuthenticated, (res) => {
    res.render('event', { title: 'Créer un évènement' });
});

router.post('/', createEvent);

module.exports = router;
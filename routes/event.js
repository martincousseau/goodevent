const express = require('express');
const { getEvent, createEvent } = require('../controllers/eventController');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('event', { title: 'Créer un évènement' });
});

router.post('/', createEvent);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getCurrentUser,ensureAuthenticated } = require('../controllers/authController');
const { addFavoriteEvent } = require('../controllers/eventController');

router.post('/:id',ensureAuthenticated, async (req, res) => {
    await addFavoriteEvent(req, res);
});

module.exports = router;

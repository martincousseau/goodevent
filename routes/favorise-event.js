const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');
const { addFavoriteEvent } = require('../controllers/eventController');

router.post('/:id', async (req, res) => {
    const user = getCurrentUser(req);
    if (!user) return res.status(401).send("Unauthorized access");

    await addFavoriteEvent(req, res);
});



module.exports = router;

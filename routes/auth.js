const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Inscription' });
});

router.post('/register', register);

module.exports = router;
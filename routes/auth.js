const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Inscription' });
});

router.post('/register', register);
router.get('/login', (req, res) => {
    res.render('login', { title: 'Connexion' });
});
router.post('/login', login);

module.exports = router;
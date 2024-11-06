const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.render('login', { title: 'Se connecter' });
});

router.post('/', login);


module.exports = router;
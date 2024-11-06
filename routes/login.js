const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'pass') {
        req.session.user = { name: username };
        res.redirect('/home');
    } else {
        res.render('login', { title: 'Login', error: 'Invalid credentials' });
    }
});

module.exports = router;
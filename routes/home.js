const express = require('express');
const auth = require('../auth.js');
const router = express.Router();

router.get('/', auth, (req, res) => {
    res.render('home', { title: 'Home', user: req.session.user });
});

module.exports = router;
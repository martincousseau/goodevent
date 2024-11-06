const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/home', auth, function(req, res) {
    res.render("layout", {title: "Page d'accueil", user : req.session.user});
});

module.exports = router;
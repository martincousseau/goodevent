const express = require('express');
const router = express.Router();

// Route pour afficher la page d'accueil
router.get('/', (req, res) => {
    console.log('Rendering account page...');
    console.log('user : ', user)
    res.render('account', { title: 'My Account', user: req.session.user });
});


module.exports = router;

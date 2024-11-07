const express = require('express');
const router = express.Router();

// Middleware pour vérifier si l'utilisateur est connecté
router.use((req, res, next) => {
    console.log('req.session.user',req.session.user)
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    next(); 
});

// Route pour afficher la page d'accueil
router.get('/', (req, res) => {
    console.log('Rendering home page...');
    res.render('home', { title: 'Home', user: req.session.user });
});


module.exports = router;

const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');

// Middleware pour vérifier si l'utilisateur est connecté
router.use((req, res, next) => {
    const user = getCurrentUser(req); 
    if (!user) {
        console.log('Pas de user.')
        return res.redirect('/login'); 
    }
    next(); 
});

// Route pour afficher la page d'accueil
router.get('/', (req, res) => {
    const user = getCurrentUser(req); 
    console.log('Rendering home page...');
    res.render('home', { title: 'Home', user: user });
});


module.exports = router;

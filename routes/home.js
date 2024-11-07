const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');
const { getAllEvents } = require('../controllers/eventController');

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
router.get('/', async (req, res) => {
    const user = getCurrentUser(req); 
    try {
        const events = await getAllEvents();  
        console.log('Rendering home page...');
        res.render('home', { title: 'Home', user: user, events: events }); 
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des événements');
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');
const { getAllEvents } = require('../controllers/eventController');

router.use((req, res, next) => {
    const user = getCurrentUser(req); 
    if (!user) {
        console.log('Pas de user.')
        return res.redirect('/login'); 
    }
    next(); 
});

router.get('/', async (req, res) => {
    const user = getCurrentUser(req); 
    try {
        const filter = req.query.filter || '';
        const sort = req.query.sort || '';
        const events = await getAllEvents(filter, sort);  
    
        res.render('home', { title: 'Bienvenue sur Good Event', user: user, events: events, filter: filter, sort: sort });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des événements');
    }
});


module.exports = router;

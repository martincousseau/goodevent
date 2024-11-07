const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');


// Route pour afficher la page mon compte
router.post('/', (req, res) => {

    //TO DO
    // liste des events créés par l'utilisateur, bouton qui renvoi vers les favoris de l'utilisateur 
    const user = getCurrentUser(req);
    console.log('Rendering account page...');
    console.log('user : ', user)
    res.render('account', { title: 'My Account', user:user});
});


module.exports = router;

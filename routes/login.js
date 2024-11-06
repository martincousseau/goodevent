const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/login', function(req, res) {
    console.log("login");
    res.render("login", {title: "Connexion"});
});

router.post('/login', function(req, res) {

    // Utilisateur fake ici
    // TODO : aller chercher l'utilisateur en base de données à partir du login et du (hash du) mot de passe
    req.session.user = { firstname : "Jean", lastname : "Dupond"};
    res.redirect("/home");
});
module.exports = router;

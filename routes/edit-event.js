const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');
const Event = require('../models/Event');

router.get('/:id', async (req, res) => {
    const user = getCurrentUser(req);
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send("Événement non trouvé.");
        }

        // Vérifier si l'utilisateur est l'auteur de l'événement
        if (event.creator_id.toString() !== user._id.toString()) {
            return res.status(403).send("Vous n'êtes pas autorisé à modifier cet événement.");
        }

        // Rendre la page d'édition avec les détails de l'événement
        res.render('edit-event', { title: 'Modifier l\'événement', event: event });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement:", error);
        res.status(500).send("Erreur interne du serveur.");
    }
});

router.post('/:id', async (req, res) => {
    const user = getCurrentUser(req);
    const eventId = req.params.id;
    const { name, event_date, price, theme } = req.body;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).send("Événement non trouvé.");
        }

        // Vérifier si l'utilisateur est l'auteur de l'événement
        if (event.creator_id.toString() !== user._id.toString()) {
            return res.status(403).send("Vous n'êtes pas autorisé à modifier cet événement.");
        }

        // Mettre à jour les détails de l'événement
        event.name = name;
        event.event_date = event_date;
        event.price = price;
        event.theme = theme;

        await event.save();

        res.redirect('/home');
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        res.status(500).send("Erreur interne du serveur.");
    }
});

module.exports = router;
const Event = require('../models/Event');
const { getCurrentUser } = require('../controllers/authController');

async function createEvent(req, res) {
    const user = getCurrentUser(req);
    const { name, event_date, price, theme } = req.body;
    const creator_id = user ? user._id : null;
    
    try {
        const event = new Event({ name, event_date, price, theme, creator_id });
        await event.save();
        res.redirect('/home');
    } catch (error) {
        console.error("Erreur lors de la création de l'évènement:", error);
        res.status(500).send("Erreur interne du serveur lors de la création de l'événement.");
    }
}

async function getAllEvents() {
    try {
        // Récupère tous les événements dans la base de données
        const events = await Event.find(); 
        return events; // Retourne simplement la liste des événements
    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        throw new Error("Erreur interne du serveur lors de la récupération des événements.");
    }
}

module.exports = { createEvent, getAllEvents };

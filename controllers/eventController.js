const Event = require('../models/Event');
const { getCurrentUser } = require('../controllers/authController');
const Favorite = require('../models/Favorite');

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

async function getAllEvents(filter, sort) {
    try {
        let query = Event.find();

        if (filter && filter !== 'all') {
            query = query.where('theme').equals(filter);
        }

        if (sort) {
            if (sort === 'date') {
                query = query.sort({ event_date: 1 });
            } else if (sort === 'price') {
                query = query.sort({ price: 1 });
            }
        }

        const events = await query.exec();
        return events;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        throw new Error("Erreur interne du serveur lors de la récupération des événements.");
    }
}

async function getEvents(userId) {
    try {
        let query = Event.find().where('creator_id').equals(userId);;
        const events = await query.exec() || null;
        return events;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements par user:", error);
        throw new Error("Erreur interne du serveur lors de la récupération des événements par user.");
    }

}

async function addFavoriteEvent(req, res) {
    const user = getCurrentUser(req);
    const favorite_event_id = req.params.id;

    try {
        const favorite = new Favorite({ favorite_user_id: user._id, favorite_event_id });
        await favorite.save();
        res.redirect('/account');
    } catch (error) {
        console.error("Erreur lors de l'ajout en favoris:", error);
        res.status(500).send("Erreur interne lors de l'ajout en favoris.");
    }
}

async function getFavEvents(req, res) {
    const user = getCurrentUser(req);
    if (!user) return res.status(401).send("Unauthorized access");

    try {
        const favorites = await Favorite.find({ favorite_user_id: user._id });
        const favoriteEventIds = favorites.map(fav => fav.favorite_event_id);
        const fav_events = await Event.find({ _id: { $in: favoriteEventIds } });

        return fav_events;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements favoris par user:", error);
        res.status(500).send("Erreur interne du serveur lors de la récupération des événements favoris par user.");
    }
}


module.exports = { createEvent, getAllEvents, getEvents,addFavoriteEvent, getFavEvents };
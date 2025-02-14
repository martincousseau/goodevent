const Event = require("../models/Event");
const Favorite = require("../models/Favorite");

async function createEvent(req, res) {
  const user = req.user;
  console.log("createEvent - User:", user);
  const creator_id = user ? user._id : null;
  const { name, theme, price, event_date, image_url } = req.body;

  try {
    const event = new Event({
      name,
      theme,
      price,
      event_date,
      creator_id,
      image_url,
    });
    await event.save();
    res.status(201).json(event); // Success: 201 Created + event data
  } catch (error) {
    console.error("Error creating event:", error); // Log the error!
    res.status(500).json({
      message: "Internal server error",
      error: error.message, // Include the actual error message
    }); // Error: 500 + JSON error message
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    console.log("getAllEvents - Events:", events);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getEventById(req, res) {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getEventsByUserId(userId) {
  // The missing function!
  try {
    const events = await Event.find({ creator_id: userId });
    return events;
  } catch (error) {
    console.error("Error getting events by user ID:", error);
    throw error; // Re-throw for handling in the route
  }
}

const addFavoriteEvent = async (req, res) => {
  const eventId = req.params.id;
  const user = req.user;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Vérifie si l'événement est déjà dans les favoris
    const existingFavorite = await Favorite.findOne({
      favorite_event_id: eventId,
      favorite_user_id: user._id,
    });

    if (existingFavorite) {
      // Si déjà favori, le retirer
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.json({ message: "Event removed from favorites successfully" });
    } else {
      // Sinon, l'ajouter aux favoris
      const favorite = new Favorite({
        favorite_event_id: eventId,
        favorite_user_id: user._id,
      });
      await favorite.save();
      return res.json({ message: "Event added to favorites successfully" });
    }
  } catch (error) {
    console.error("Error adding favorite event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getFavoriteEvents(req) {
  const user = req.user;

  if (!user) {
    console.error("User not found in getFavoriteEvents");
    return [];
  }

  try {
    const favorites = await Favorite.find({ favorite_user_id: user._id });
    const favoriteEventIds = favorites.map((fav) => fav.favorite_event_id);
    const fav_events = await Event.find({ _id: { $in: favoriteEventIds } });
    return fav_events;
  } catch (error) {
    console.error("Error fetching favorite events:", error);
    return [];
  }
}

module.exports = {
  createEvent,
  addFavoriteEvent,
  getFavoriteEvents,
  getEventById,
  getAllEvents,
  getEventsByUserId, // Make sure to export this function
};

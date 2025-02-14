const express = require("express");
const router = express.Router();
const {
  createEvent,
  addFavoriteEvent,
  getEventById,
  getAllEvents, // Make sure getAllEvents is imported
} = require("../controllers/eventController");
const { authenticateJWT } = require("../controllers/authController");

router.post("/", authenticateJWT, createEvent);

router.post("/:id/favorite", authenticateJWT, addFavoriteEvent);

router.put("/:id", authenticateJWT, async (req, res) => {
  const user = req.user;
  const eventId = req.params.id;
  const { name, event_date, price, theme, image_url } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.creator_id.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this event." });
    }

    event.name = name;
    event.event_date = event_date;
    event.price = price;
    event.theme = theme;
    event.image_url = image_url;

    await event.save();

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", getAllEvents);

router.get("/:id", getEventById);

module.exports = router;

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

router.put("/:id", authenticateJWT, (req, res) => {
  const eventId = req.params.id;
  const updatedEventData = req.body;

  Event.findByIdAndUpdate(eventId, updatedEventData, { new: true })
    .then((updatedEvent) => {
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(updatedEvent);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/", getAllEvents);

router.get("/:id", getEventById);

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateJWT } = require("../controllers/authController");
const {
  getEventsByUserId,
  getFavoriteEvents,
} = require("../controllers/eventController");

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    const user_events = await getEventsByUserId(user._id);
    const user_fav_events = await getFavoriteEvents(req);
    console.log("user_fav_events : ", user_fav_events);

    res.status(200).json({
      title: "My Account",
      user: user,
      user_events: user_events,
      user_fav_events: user_fav_events,
    });
  } catch (error) {
    console.error("Error in account route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  getEventsByUserId,
  getFavoriteEvents,
} = require("../controllers/eventController");

const JWT_SECRET = "secretstory";

// JWT Verification Middleware
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      try {
        const foundUser = await User.findById(user.userId);
        if (!foundUser) {
          return res.sendStatus(401);
        }
        req.user = foundUser;
        next();
      } catch (error) {
        console.error("Error finding user:", error);
        return res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const user = req.user;
    const user_events = await getEventsByUserId(user._id);
    const user_fav_events = await getFavoriteEvents(req); // Call the function

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

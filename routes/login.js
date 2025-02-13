const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.get("/", (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      isAuthenticated: true,
      message: "Connecté avec succès",
      user: req.session.user,
    });
  }
});

router.post("/", login);

module.exports = router;

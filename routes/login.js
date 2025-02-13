const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json({
      isAuthenticated: true,
      message: "Connecté avec succès",
      user: req.user,
    });
  }
});

router.post("/", login);

module.exports = router;

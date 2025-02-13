const express = require("express");
const { register } = require("../controllers/authController");
const router = express.Router();

// Enregistrement d'un nouvel utilisateur
router.post("/", register);

module.exports = router;
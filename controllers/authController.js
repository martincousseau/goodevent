const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Clé secrète utilisée pour signer le JWT
const JWT_SECRET = "ta_clé_secrète";

async function register(req, res) {
  console.log("inside register");
  const { username, email, password, first_name, last_name, birth_date } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      birth_date,
    });
    await user.save();
    // Envoie d'une réponse JSON
    res.status(201).json({
      success: true,
      message: "Utilisateur inscrit avec succès",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "L'email ou le nom d'utilisateur existe déjà.",
      });
    }
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      error: "Erreur interne du serveur lors de l'inscription.",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: "Email ou mot de passe incorrect." });
    }

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload du token
      JWT_SECRET, // Clé secrète
      { expiresIn: "1h" } // Expiration du token dans 1 heure
    );

    res.status(200).json({
      success: true,
      message: "Connecté avec succès",
      token, // Envoie le token au frontend
    });
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

function getCurrentUser(req) {
  return req.session.user;
}

function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

module.exports = { register, login, getCurrentUser, ensureAuthenticated };

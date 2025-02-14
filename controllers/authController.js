const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Clé secrète utilisée pour signer le JWT
const JWT_SECRET = "secretstory";

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log the error!
        return res.status(403).json({ message: "Invalid token" }); // Send JSON error
      }

      try {
        const foundUser = await User.findById(user.userId); // Correct user ID field
        if (!foundUser) {
          return res.status(401).json({ message: "User not found" }); // Send JSON error
        }
        req.user = foundUser; // Set req.user correctly
        next();
      } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Internal server error" }); // Send JSON error
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

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
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Connecté avec succès",
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

function getCurrentUser(req) {
  return req.user;
}

function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
}

module.exports = {
  register,
  login,
  getCurrentUser,
  ensureAuthenticated,
  authenticateJWT,
};

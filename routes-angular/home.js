const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../controllers/authController");
const { getAllEvents } = require("../controllers/eventController");

router.use((req, res, next) => {
  const user = getCurrentUser(req);
  if (!user) {
    console.log("Pas de user.");
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }
  req.user = user;
  next();
});

// Route pour récupérer la liste des événements
router.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || "all";
    const sort = req.query.sort || "";
    const events = await getAllEvents(filter, sort);

    res.json({
      message: "Liste des événements récupérée avec succès",
      user: req.user,
      events: events,
      filter: filter,
      sort: sort,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des événements" });
  }
});

module.exports = router;

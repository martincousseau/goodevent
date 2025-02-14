const morgan = require("morgan");
const express = require("express");
const path = require("path");
const session = require("express-session");
const { mongoose } = require("mongoose");

const app = express();
const port = 3000;

// CORS pour permettre les requêtes depuis Angular
const cors = require("cors");
// app.use(cors());

// Autorise uniquement Angular
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour la gestion de la session (optionnel si tu utilises l'authentification)
app.use(
  session({
    secret: "top secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Connect to the DB (MongoDB)
mongoose
  .connect("mongodb://localhost:27017/projet_test", {})
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion MongoDB:", err));

// Servir les fichiers Angular
// Assurez-vous que vous avez bien exécuté 'ng build --prod' ou 'ng build' et que les fichiers sont dans 'public/frontend'
app.use(express.static(path.join(__dirname, "public/frontend")));

// Routes API : Utilisation de ces routes pour l'accès aux données (REST)
const indexRouter = require("./routes/index.js");
const registerRouter = require("./routes/auth.js");
const accountRouter = require("./routes/account.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");
const eventRouter = require("./routes/event.js");
const editEventRouter = require("./routes/event.js");
const favoriseEventRouter = require("./routes/event.js");

// Routes API
app.use("/api", indexRouter);
app.use("/api/register", registerRouter);
app.use("/api/account", accountRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/event", eventRouter);
app.use("/api/edit-event", editEventRouter);
app.use("/api/favorise-event", favoriseEventRouter);

// Rediriger toutes les autres routes (non API) vers index.html pour Angular routing
// Cela permet à Angular de gérer le routage côté client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/frontend/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// modules
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const session = require("express-session");

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Imports router
const indexRouter = require("./routes/index.js");
const loginRouter = require("./routes/login.js");
const homeRouter = require("./routes/home.js");
const logoutRouter = require("./routes/logout.js");

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true
}));

// middleware d'authentification
function auth(req, res, next) {
    if (req?.session?.user) {
        return next();
    }
    else {
        return res.sendStatus(401);
    }
}

// server start
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

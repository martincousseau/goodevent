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

// Import routers
const indexRouter = require("./routes/index.js");
const loginRouter = require("./routes/login.js");
const homeRouter = require("./routes/home.js");
const logoutRouter = require("./routes/logout.js");

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true
}));

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/logout', logoutRouter);

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

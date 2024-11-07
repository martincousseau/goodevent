const morgan = require('morgan');
const express = require('express');
const path = require('path');
const session = require("express-session");
const {mongoose} = require('mongoose');


const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import routers
const indexRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js");
const homeRouter = require("./routes/home.js");
const loginRouter = require("./routes/login.js");
const logoutRouter = require("./routes/logout.js");

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'top secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// connect to the db 
mongoose.connect('mongodb://localhost:27017/projet_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

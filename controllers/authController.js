// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.redirect('/home');
    } catch (error) {
        if (error.code === 11000) { 
            res.status(400).send("L'email ou le nom d'utilisateur existe déjà.");
        } else {
            console.error("Erreur lors de l'inscription:", error);
            res.status(500).send("Erreur interne du serveur lors de l'inscription.");
        }
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    console.log('login')
    console.log('email : ', email)
    console.log('password : ', password)
    try {
        const user = await User.findOne({ email });
        console.log('user : ', user)

        if (!user) {
            return res.render('login', { title: 'Login', error: 'Email ou mot de passe incorrect.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', { title: 'Login', error: 'Email ou mot de passe incorrect.' });
        }

        req.session.user = user;
        
        console.log('user in authcontroller: ', req.session.user)
        res.redirect('/home');
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion:", error);
        res.status(500).send("Erreur interne du serveur");
    }
}

function getCurrentUser(req) {
    return req.session.user;
}

module.exports = { register, login, getCurrentUser };

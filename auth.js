// auth.js
function auth(req, res, next) {
    // Vérifie si l'utilisateur est connecté en regardant la session
    if (req.session && req.session.user) {
        // Si l'utilisateur est connecté, passe au prochain middleware
        return next();
    } else {
        // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
        res.redirect('/login');
    }
}

module.exports = auth;
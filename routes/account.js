const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/authController');

router.get('/', (req, res) => {
    console.log('Rendering My Account page...');
    const user = getCurrentUser(req); 
    res.render('account', { title: 'My Account', user: user });
});


module.exports = router;

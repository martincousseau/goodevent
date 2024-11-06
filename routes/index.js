const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', function(req, res) {
    if(req?.session?.user){
        res.redirect("/home");
    }
    else{
        res.redirect("/login");
    }
});

module.exports = router;

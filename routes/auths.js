const express = require('express');
const router = express.Router();
const passport = require('passport');
const {ensureAuthenticated} = require('../config/auth');

//Google Auth!
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

//Google Callback!
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/users/login', failureFlash: true}), (req, res) => {
    console.log(req.user);
    req.session.save(function(){
        res.redirect('/map');
    });
});


module.exports = router;
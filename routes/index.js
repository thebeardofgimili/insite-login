const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const passport = require('passport');

//Welcome Page!
router.get('/', (req, res) => res.render('welcome'));

//Dashboard, the ensureAuthenticated is just added to any get request to protect the page
router.get('/dashboard', (req, res) => 
res.render('dashboard'));

module.exports = router;
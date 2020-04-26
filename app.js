const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

//Passport Config
require('./config/passport')(passport);

//Databse Configuration
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

app.get("/call",function(req, res){
    
    console.log("Calling");
    client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+12269733125',
         from: '+17204774896'
       })
      .then(call => console.log(call.sid));

    client.messages
      .create({body: 'Hi there!', from: '+17204774896', to: '+12269733125'})
      .then(message => console.log(message.sid));

});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/auths', require('./routes/auths'));
app.use(express.static('/views'));
app.use('/map', express.static(__dirname + '/public'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//User Model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          //Match passwords
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
      new GoogleStrategy({
        //option for Google Strat
        callbackURL: '/auth/google/redirect',
        clientID: '980957268423-2ji9kps4bvh1h994t1hmbdus8nevf568.apps.googleusercontent.com',
        clientSecret: '7XsWK4m173Zwun-LT1ebJCWS'
      }, () =>{})
  )
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

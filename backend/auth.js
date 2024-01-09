const passport = require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // Save the user data to your database or use it as needed
    return done(null, profile);
  }));
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
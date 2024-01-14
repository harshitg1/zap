const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

let user = null;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
     async(accessToken, refreshToken, profile, done) => {
      const newUser = { id: profile.id, profile }; 
      user = newUser;
      done(null, newUser);
    }
  )
);

const getUser = () => {
  return user; 
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const u = user;
  console.log('Deserializing user with ID:', id);
  done(null, u);
});

module.exports = { passport, getUser };


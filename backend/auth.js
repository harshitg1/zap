const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const users = [];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      
      if (users[profile.id]) {
        return done(null, users[profile.id]);
      }
           // If the user doesn't exist
      const newUser = { id: profile.id, profile }; 
      users[profile.id] = newUser;
      done(null, newUser);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });
passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user);
});
module.exports = passport;



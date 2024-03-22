const passport = require("passport");
const User = require("../Models/User");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, done) {
      const { email, name } = profile._json;
      console.log(profile);
      const user = await User.findOne({ email: email });
      if (!user) {
        newUser = new User({
          email,
          name,
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, user);
      }
    }
  )
);

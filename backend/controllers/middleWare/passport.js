require("dotenv").config();

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../models/userModel");
const jwtSecret = process.env.JWT_SECRET; // Replace with your actual secret key
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");

// Replace these values with your Google OAuth credentials and JWT secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;

// Use the GoogleStrategy within Passport.
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // The 'profile' object contains information about the authenticated user.
      // You can use this information to create or update a user in your database.

      const userName = profile.displayName.replace(/\s/g, "") + profile.id;
      // Example: Create or update a user in the database
      const user = {
        username: userName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        // Turning following off so all images comes from imagekit
        // profilePicture: profile.photos[0].value,
        email: profile.emails[0].value,
      };

      // You can customize the user object based on your needs.

      return done(null, user);
    }
  )
);

// Use the FacebookStrategy within Passport.
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "emails", "name"], // emails needs to be listed here
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("found user:", profile);
      // The 'profile' object contains information about the authenticated user.
      // You can use this information to create or update a user in your database.
      const userName = profile.name.givenName + profile.name.familyName + profile.id;
      // Example: Create or update a user in the database
      const user = {
        username: userName,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      };

      // You can customize the user object based on your needs.

      return done(null, user);
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

// Use JWT strategy for token authentication
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      // Find the user by ID from the JWT payload
      const user = await User.findById(jwtPayload.id);

      // If user not found, return false
      if (!user) {
        return done(null, false);
      }

      // If user is found, return the user
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;

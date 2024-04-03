const User = require("../../models/userModel");
const BlackJWT = require("../../models/blackjwt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const requireJwtAuth = passport.authenticate("jwt", { session: false });

// // Verify a JWT token
const verifyToken = async (token) => {
  const isBlacklisted = await BlackJWT.findOne({ token });
  if (isBlacklisted) {
    // console.log("Blacklisted JWT: " + isBlacklisted.token);
    // res.status(401).send("Invalid JWT");
    const user = false;
    return user;
  } else {
    const secret = process.env.JWT_SECRET;

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, async (err, decodedToken) => {
        if (err) {
          // reject(err);
          console.log(err);
          const user = false;
          resolve(user);
        } else {
          const user = await User.findOne({ _id: decodedToken.id });
          resolve(user);
        }
      });
    });
  }
};

// // Verify a Refresh token
const verifyRefreshToken = async (token) => {
  const isBlacklisted = await BlackJWT.findOne({ token });
  if (isBlacklisted) {
    // console.log("Blacklisted JWT: " + isBlacklisted.token);
    // res.status(401).send("Invalid JWT");
    const user = false;
    return user;
  } else {
    const secret = process.env.JWT_REFRESH;

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, async (err, decodedToken) => {
        if (err) {
          // reject(err);
          const user = false;
          resolve(user);
        } else {
          const user = await User.findOne({ _id: decodedToken.id });
          resolve(user);
        }
      });
    });
  }
};

module.exports = { verifyToken, verifyRefreshToken };

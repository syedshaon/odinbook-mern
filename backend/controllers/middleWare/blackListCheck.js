const ExtractJwt = require("passport-jwt").ExtractJwt;
const BlackJWT = require("../../models/blackjwt");

const isTokenBlacklisted = async (req, res, next) => {
  const token = ExtractJwt.fromHeader("x-auth-token");

  const isBlacklisted = await BlackJWT.findOne({ token });

  // Check if the token is blacklisted (you need to implement this function)
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token blacklisted" });
  }

  next();
};

module.exports = isTokenBlacklisted;

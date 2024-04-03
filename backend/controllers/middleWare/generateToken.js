const jwt = require("jsonwebtoken");

async function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, secret, options);
}

async function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
  };

  const secret = process.env.JWT_REFRESH;
  const options = {
    expiresIn: "10d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = { generateToken, generateRefreshToken };

const User = require("../../models/userModel");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const Posts = require("../../models/postModel");

const { generateToken, generateRefreshToken } = require("./generateToken");

const signin = async (req, res) => {
  // Authenticate author with jwt

  try {
    // Get the user credentials from the request body
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by their username
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isActive) {
      return res.status(404).json({ type: "verify", message: "Please verify your email first, to Login." });
    }

    if (!user.password) {
      return res.status(404).json({ type: "socialSignup", message: "Please use Social Login then set a new Password." });
    }

    // Verify the password
    const match = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!match) {
      return res.status(401).json({ type: "wrongPW", message: "Incorrect password" });
    }

    // Generate a JWT token for the user
    const token = await generateToken(user);
    const tokenExpires = new Date(Date.now() + 60 * 15 * 1000);
    const refreshToken = await generateRefreshToken(user);

    // Set the JWT Refresh token in  browser cookie
    // res.cookie("refreshtoken", refreshtoken, {
    //   // expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
    //   expires: new Date(Date.now() + 60 * 60 * 24 * 10 * 1000), // Expires in 10 days
    //   httpsOnly: true,
    //   sameSite: "None",
    //   secure: true,
    // });

    // The above code is unable to set cookie on live site. I've tested different samesite attribute but result it same.

    // res.header("Set-Cookie", "refreshtoken=" + refreshtoken + ";Path=/;HttpOnly;Secure;SameSite=None;Expires=864000");
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 864000 * 1000); // Add milliseconds
    const expires = expirationDate.toUTCString();

    // res.header("Set-Cookie", `refreshtoken=${refreshtoken}; Path=/; HttpOnly:false; Secure; SameSite=None; Expires=${expires}`);
    res.header("Set-Cookie", `refreshtoken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None;`);

    // const postsDetails = user.posts.sort({ timestamp: -1 }).populate({
    //   path: "comments.provider",
    //   select: "firstName lastName username profilePicture", // Select the fields you want to include
    // });

    const postsDetails = await user.getAllPosts();

    const frontUser = { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, bio: user.bio, pendingFriends: user.pendingFriends, friends: user.friends, following: user.following, followers: user.followers, profilePicture: user.profilePicture, coverPicture: user.coverPicture, posts: postsDetails };

    // Send the token to the user
    return res.status(200).json({ token, expire: tokenExpires, user: frontUser });
  } catch (error) {
    // Handle token verification errors
    console.error("Error during signing In:", error);
    res.status(400).json({ message: "Internal server error." });
  }
};

module.exports = signin;

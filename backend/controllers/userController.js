const User = require("../models/userModel");
const Posts = require("../models/postModel");
const BlackJWT = require("../models/blackjwt");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const fs = require("fs");

const { sendConfirmationEmail, sendResetPWEmail } = require("./middleWare/sendMail");
const { verifyRefreshToken, verifyToken } = require("./middleWare/verifyToken");
const { generateToken, generateRefreshToken } = require("./middleWare/generateToken");

const userController = {
  async test(req, res, next) {
    const me = req.user.toJSON();
    res.json({ me: me });
  },
  // Create a new author
  async signup(req, res, next) {
    console.log(req.body);
    try {
      const { username, password, repeatPassword, email, firstName, lastName } = req.body;

      // Check if required fields are provided
      if (!username || !password || !repeatPassword || !email || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (username.length > 50) {
        return res.status(400).json({ message: "Username's max character lenth is 50." });
      }
      if (firstName.length > 10) {
        return res.status(400).json({ message: "First Name's max character lenth is 10." });
      }
      if (lastName.length > 10) {
        return res.status(400).json({ message: "Last Name's max character lenth is 10." });
      }
      if (password.length > 50) {
        return res.status(400).json({ message: "Password's max character lenth is 50." });
      }

      const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const letterAndNumber = /^[a-zA-Z0-9]+$/;
      if (!username.match(letterAndNumber)) {
        return res.status(400).json({ message: "Username can contain letters and numbers only!" });
      }

      if (!email.match(regex)) {
        return res.status(400).json({ message: "Email address is invalid!" });
      }

      // Check if passwords match
      if (password !== repeatPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // Validate the password

      if (password === email) {
        return res.status(400).json({ message: "Can't use the email address as password." });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
      }

      if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter." });
      }

      if (!/[a-z]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one lowercase letter." });
      }

      if (!/[0-9]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one number." });
      }

      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "Username or email is already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with isActive set to false
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        isActive: false,
      });

      // Save the user to the database
      await newUser.save();

      // Generate a token for email confirmation (expires in 2 hours)
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_CONFIRMATION, { expiresIn: "2h" });

      // Send a confirmation email with the token link
      sendConfirmationEmail(newUser.email, token);

      // Respond with a success message or user data
      res.status(201).json({ message: "Signup successful! Check your email including SPAM folder to Activate!" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getVerificationEmail(req, res) {
    try {
      const { email } = req.body;

      // Check if the email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Check if the user is already active
      if (user.isActive) {
        return res.status(200).json({ message: "User is already active. Please sign in with your user ID and Password." });
      }

      // Generate a new token for email confirmation (expires in 2 hours)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_CONFIRMATION, { expiresIn: "2h" });

      // Send a new confirmation email with the new token link
      sendConfirmationEmail(user.email, token);

      // Respond with a success message
      res.status(200).json({ message: "Confirmation email resent. Check your email for confirmation." });
    } catch (error) {
      console.error("Error during resending confirmation email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      // console.log(token);

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_CONFIRMATION);

      // Find the user by userId in the token
      const user = await User.findById(decodedToken.userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Check if the user is already active
      if (user.isActive) {
        return res.status(200).json({ message: "User is already active. Please sign in with your user ID and Password." });
      }

      // Set isActive to true
      user.isActive = true;
      await user.save();

      res.status(200).json({ message: "You email is verified now. Please sign in with your user ID and Password." });

      // Optionally, you can redirect the user to a confirmation success page
      // res.redirect("http://your-frontend-app/confirmation-success"); // Adjust the frontend URL
    } catch (error) {
      // Handle token verification errors
      console.error("Error during email verification:", error);
      res.status(400).json({ message: "Invalid or expired token." });
    }
  },
  async getResetPass(req, res, next) {
    try {
      const { email } = req.body;

      // Check if the email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Generate a token for password reset (expires in 1 hour)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: "2h" });

      // Send a reset password email with the token link
      sendResetPWEmail(user.email, token);

      // Respond with a success message
      res.status(200).json({ message: "Reset password email sent. Check your email for instructions." });
    } catch (error) {
      console.error("Error during sending reset password email:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async resetPass(req, res, next) {
    try {
      const { token, newPassword, repeatPassword } = req.body;

      // Check if required fields are provided
      if (!token || !newPassword || !repeatPassword) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Check if passwords match
      if (newPassword !== repeatPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // Verify the reset password token
      const decodedToken = jwt.verify(token, process.env.JWT_RESET_PASSWORD);

      // Find the user by userId in the token
      const user = await User.findById(decodedToken.userId);
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (newPassword === user.email) {
        return res.status(400).json({ message: "Can't use the email address as password." });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
      }

      if (!/[A-Z]/.test(newPassword)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter." });
      }

      if (!/[a-z]/.test(newPassword)) {
        return res.status(400).json({ message: "Password must contain at least one lowercase letter." });
      }

      if (!/[0-9]/.test(newPassword)) {
        return res.status(400).json({ message: "Password must contain at least one number." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Respond with a success message
      res.status(200).json({ message: "Password Reset successful." });
    } catch (error) {
      // Handle token verification errors
      console.error("Error during password reset:", error);
      res.status(400).json({ message: "Invalid or expired token." });
    }
  },
  async changePass(req, res, next) {
    const user = req.user;
    if (user.email === "Blake_Brekke91@gmail.com" || user.email === "Khalil_Stark16@gmail.com") {
      res.status(401).json({ message: "Can't Change Password of the Guest Account." });
      return;
    }
    if (user) {
      try {
        const { newPassword, repeatPassword } = req.body;

        // Check if required fields are provided
        if (!newPassword || !repeatPassword) {
          return res.status(400).json({ message: "All fields are required." });
        }

        // Check if passwords match
        if (newPassword !== repeatPassword) {
          return res.status(400).json({ message: "Passwords do not match." });
        }

        if (newPassword === user.email) {
          return res.status(400).json({ message: "Can't use the email address as newPassword." });
        }

        if (newPassword.length < 8) {
          return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        if (!/[A-Z]/.test(newPassword)) {
          return res.status(400).json({ message: "Password must contain at least one uppercase letter." });
        }

        if (!/[a-z]/.test(newPassword)) {
          return res.status(400).json({ message: "Password must contain at least one lowercase letter." });
        }

        if (!/[0-9]/.test(newPassword)) {
          return res.status(400).json({ message: "Password must contain at least one number." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Following will invalidate previous jwt and refresh token and from front-end will need to ask for loggin in agian.

        const token = req.headers.authorization;

        // When user updates. blacklist his previous jwt.
        const newblacklistedJWT = new BlackJWT({
          token: token,
        });
        const result = await newblacklistedJWT.save();

        res.clearCookie("refreshtoken");

        // Respond with a success message
        res.status(200).json({ message: "Password changed successfully." });
      } catch (error) {
        // Handle token verification errors
        console.error("Error during password change:", error);

        res.status(401).json({ message: "Internal server error" });
      }
    }
  },

  async refresh(req, res) {
    // Verify refresh token

    try {
      if (!req.cookies.refreshtoken) {
        return res.status(500).json({ message: "No Refresh Token Provided.", message: true });
      }

      const RefreshToken = req.cookies.refreshtoken;

      // Validate the auth token.
      const user = await verifyRefreshToken(RefreshToken);

      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: "User not found", message: true });
      }

      // Generate a JWT token for the user
      const token = await generateToken(user);
      const tokenExpires = new Date(Date.now() + 60 * 15 * 1000);
      const postsDetails = await user.getAllPosts();

      const frontUser = { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, bio: user.bio, pendingFriends: user.pendingFriends, friends: user.friends, following: user.following, followers: user.followers, profilePicture: user.profilePicture, coverPicture: user.coverPicture, posts: postsDetails };
      // Send the token to the user
      return res.json({ token, expire: tokenExpires, user: frontUser });
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
  async loadme(req, res) {
    // Verify refresh token

    try {
      if (!req.cookies.auth_cookie) {
        return res.status(500).json({ message: "No auth Token Provided.", message: true });
      }

      const authToken = req.cookies.auth_cookie;

      // Validate the auth token.
      // passport.authenticate(authToken, { session: false });
      const user = await verifyToken(authToken);
      // const user = req.user;

      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: "User not found", message: true });
      }

      // Generate a JWT token for the user
      const token = await generateToken(user);
      const tokenExpires = new Date(Date.now() + 60 * 15 * 1000);
      const postsDetails = await user.getAllPosts();

      const frontUser = { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, bio: user.bio, pendingFriends: user.pendingFriends, friends: user.friends, following: user.following, followers: user.followers, profilePicture: user.profilePicture, coverPicture: user.coverPicture, posts: postsDetails };
      // Send the token to the user
      return res.json({ token, expire: tokenExpires, user: frontUser });
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
  async validateLoginStatus(req, res) {
    // console.log(req);
    // console.log(req.authorization);
    // console.log("came for validation.");
    try {
      const user = req.user;
      if (user) {
        const postsDetails = await user.getAllPosts();

        return res.json({ user: { id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, bio: user.bio, pendingFriends: user.pendingFriends, friends: user.friends, following: user.following, followers: user.followers, profilePicture: user.profilePicture, coverPicture: user.coverPicture, posts: postsDetails } });
      }

      return res.json({});
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
  async signout(req, res, next) {
    try {
      // Invalidate the user's JWT token.
      // const token = req.headers.authorization.split(" ")[1];
      if (req.headers.authorization) {
        const token = req.headers.authorization;

        const newblacklistedJWT = new BlackJWT({
          token: token,
        });
        const result = await newblacklistedJWT.save();

        // res.clearCookie("token");
        res.clearCookie("refreshtoken");
        res.clearCookie("auth_cookie");
        return res.status(201).json({ logout: true, message: "Signed Out successfully!" });
      } else {
        return res.status(401).json({ logout: false, message: "You need to be logged in to logout." });
      }
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
  async user_update_get(req, res, next) {
    try {
      const user = req.user;
      return res.status(201).json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, bio: user.bio, profilePicture: user.profilePicture, coverPicture: user.coverPicture });
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },

  // Update an existing author
  async userUpdate(req, res, next) {
    console.log(req.body.bio);
    // Validate the auth token.
    const user = req.user;
    if (user) {
      try {
        // return res.status(201).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, bio: user.bio, profilePicture: user.profilePicture, coverPicture: user.coverPicture });

        const { firstName, lastName, email, bio } = req.body;

        if (email) {
          if (email.length > 50) {
            return res.status(400).json({ message: "Email's max character lenth is 50." });
          }
          const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
          if (!email.match(regex)) {
            // throw new Error("Email address is invalid!");
            return res.status(422).send({ message: "Email address is invalid!" });
          }
          const currentUserID = user._id;

          // Check if the email is used by another user
          const existingUser = await User.findOne({
            _id: { $ne: currentUserID },
            email: email,
          });
          if (existingUser) {
            // throw new Error("Email is already in use");
            return res.status(422).send({ message: "Email is already in use" });
          }

          // Update the user's password
          user.email = email;
        }

        if (firstName) {
          if (firstName.length > 10) {
            return res.status(400).json({ message: "First Name's max character lenth is 10." });
          }
          user.firstName = firstName;
        }
        if (lastName) {
          if (lastName.length > 10) {
            return res.status(400).json({ message: "Last Name's max character lenth is 10." });
          }
          user.lastName = lastName;
        }
        if (bio) {
          if (bio.length > 200) {
            return res.status(400).json({ message: "Bio's max character lenth is 200." });
          }
          user.bio = bio;
        }
        // if (req.file.path) {
        //   user.profilePicture = req.file.path;
        // }
        // if (req.file.path) {
        //   user.coverPicture = req.file.path;
        // }
        await user.save();

        return res.status(201).json({ firstName: user.firstName, lastName: user.lastName, bio: user.bio });
      } catch (err) {
        let errorMessage = "Internal server error";

        if (err instanceof Error) {
          errorMessage = err.message;
        }
        console.log(err);

        res.status(401).json({ message: errorMessage });
      }
    }
  },
  async updateProfilePic(req, res, next) {
    const user = req.user;

    if (user) {
      // Delete previous img

      const { thumbnail } = req.body;

      // Delete Previous Img ENDS
      try {
        user.profilePicture = thumbnail;

        await user.save();

        return res.status(201).json({ profilePicture: user.profilePicture });
      } catch (err) {
        let errorMessage = "Internal server error";

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        res.status(401).json({ message: errorMessage });
      }
    }
  },
  async updateCoverPic(req, res, next) {
    const user = req.user;
    if (user) {
      // Delete previous img

      const { cover } = req.body;
      console.log(cover);
      // Delete Previous Img ENDS
      try {
        user.coverPicture = cover;

        await user.save();
        return res.status(201).json({ coverPicture: user.coverPicture });
      } catch (err) {
        let errorMessage = "Internal server error";

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        res.status(401).json({ message: errorMessage });
      }
    }
  },
  // Delete an existing author
  async user_delete(req, res) {
    try {
      const user = req.user;
      if (user) {
        const allPostsbyThisUser = await Posts.find({ author: user._id }, "title text").exec();

        if (allPostsbyThisUser.length > 0) {
          res.status(401).json({ delete: false, message: "You first need to delete all your blog posts to delete your account." });
        } else {
          await User.findByIdAndDelete(user._id);
          res.clearCookie("refreshtoken");
          return res.json({ delete: true, message: "User deleted successfully!" });
        }
      }
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
  async profileDetails(req, res, next) {
    const username = req.params.uid;

    try {
      const searchedUser = await User.findOne({ username: username });

      // Fetch details of each post using post IDs
      // const postsDetails = await Posts.find({ _id: { $in: searchedUser.posts } }).sort({ timestamp: -1 });

      const postsDetails = await Posts.find({ _id: { $in: searchedUser.posts } })
        .sort({ timestamp: -1 })
        .populate({
          path: "comments.provider",
          select: "firstName lastName username profilePicture", // Select the fields you want to include
        });

      const coverPicture = searchedUser.coverPicture ? searchedUser.coverPicture.replace(/\\/g, "/") : "";
      const profilePicture = searchedUser.profilePicture ? searchedUser.profilePicture.replace(/\\/g, "/") : "";
      return res.status(201).json({ searchedUser: { _id: searchedUser._id, firstName: searchedUser.firstName, lastName: searchedUser.lastName, username: searchedUser.username, bio: searchedUser.bio, profilePicture: profilePicture, coverPicture: coverPicture, followers: searchedUser.followers, friends: searchedUser.friends, posts: postsDetails } });
    } catch (err) {
      let errorMessage = "Internal server error";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      res.status(401).json({ message: errorMessage });
    }
  },
};

module.exports = userController;

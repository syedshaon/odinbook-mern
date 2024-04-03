const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

const followerController = require("../controllers/followerController");
const signin = require("../controllers/middleWare/signin");

const passport = require("passport");
const requireJwtAuth = passport.authenticate("jwt", { session: false });

const isTokenBlacklisted = require("../controllers/middleWare/blackListCheck");

// router.get("/test", isTokenBlacklisted, requireJwtAuth, userController.test);
// ################### Sign Up #############################
//  DONE

// router.get("/test", userController.test);
router.post("/signup", userController.signup);
router.post("/getVerificationEmail", userController.getVerificationEmail);
router.get("/verifyEmail", userController.verifyEmail);
router.post("/getResetPass", userController.getResetPass);
router.post("/resetPass", userController.resetPass);

router.post("/changePass", isTokenBlacklisted, requireJwtAuth, userController.changePass);

// ################### Sign In #############################

router.post("/signin", signin);

// ################### Refresh Token #############################

router.get("/refresh", userController.refresh);
router.get("/loadme", userController.loadme);

// ################### Validate login status #############################

router.get("/validateLoginStatus", isTokenBlacklisted, requireJwtAuth, userController.validateLoginStatus);

// ###################  Sign Out  ###############################

router.post("/signout", userController.signout);

// ################### update an existing author #############################
// Route to update an existing author

router.get("/update", isTokenBlacklisted, requireJwtAuth, userController.user_update_get);
router.put("/update", isTokenBlacklisted, requireJwtAuth, userController.userUpdate);
router.put("/updateProfilePic", isTokenBlacklisted, requireJwtAuth, userController.updateProfilePic);
router.put("/updateCoverPic", isTokenBlacklisted, requireJwtAuth, userController.updateCoverPic);

router.get("/profile-details/:uid", isTokenBlacklisted, requireJwtAuth, userController.profileDetails);

router.post("/follow/:followingId", isTokenBlacklisted, requireJwtAuth, followerController.follow);

router.post("/unfollow/:unfollowingId", isTokenBlacklisted, requireJwtAuth, followerController.unfollow);

router.post("/sendFriendRequest/:friendId", isTokenBlacklisted, requireJwtAuth, followerController.sendFriendRequest);

router.post("/cancelFriendRequest/:friendId", isTokenBlacklisted, requireJwtAuth, followerController.cancelFriendRequest);
router.post("/acceptFriendRequest/:friendId", isTokenBlacklisted, requireJwtAuth, followerController.acceptFriendRequest);
router.post("/rejectFriendRequest/:friendId", isTokenBlacklisted, requireJwtAuth, followerController.rejectFriendRequest);
router.post("/deleteFriend/:friendId", isTokenBlacklisted, requireJwtAuth, followerController.deleteFriend);

router.get("/getAllUsers", isTokenBlacklisted, requireJwtAuth, followerController.getAllUsers);

module.exports = router;

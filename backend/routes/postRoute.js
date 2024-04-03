const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

const followerController = require("../controllers/followerController");
const postController = require("../controllers/postController");

const passport = require("passport");
const requireJwtAuth = passport.authenticate("jwt", { session: false });

const isTokenBlacklisted = require("../controllers/middleWare/blackListCheck");

// ################### Single Post #############################
// Create single post

router.post("/create", isTokenBlacklisted, requireJwtAuth, postController.post_create);
router.post("/addComment/:postId", isTokenBlacklisted, requireJwtAuth, postController.addComment);
router.post("/toggleLike/:postId", isTokenBlacklisted, requireJwtAuth, postController.toggleLike);
router.post("/followedUsersPosts", isTokenBlacklisted, requireJwtAuth, postController.followedUsersPostsAfterDate);
// router.get("/followedUsersPostsAfterDate", isTokenBlacklisted, requireJwtAuth, postController.followedUsersPostsAfterDate);

// Show single post

// router.get("/posts/:id", isTokenBlacklisted, requireJwtAuth, userController.post_show);
// Update single post

// router.put("/posts/:id", upload.single("file"), errorHandler, isTokenBlacklisted, requireJwtAuth, userController.post_edit);
// Delete single post

// router.delete("/posts/:id", isTokenBlacklisted, requireJwtAuth, userController.post_delete);

module.exports = router;

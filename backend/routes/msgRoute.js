const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const passport = require("passport");
const messengerController = require("../controllers/messengerController");
const requireJwtAuth = passport.authenticate("jwt", { session: false });

const isTokenBlacklisted = require("../controllers/middleWare/blackListCheck");

// ################### Single Post #############################
// Create single post

router.get("/getAllConversations/", isTokenBlacklisted, requireJwtAuth, messengerController.getAllConversations);
router.get("/getGroupConversations/", isTokenBlacklisted, requireJwtAuth, messengerController.getGroupConversations);

router.post("/group/", isTokenBlacklisted, requireJwtAuth, messengerController.createGroupConversation);

module.exports = router;

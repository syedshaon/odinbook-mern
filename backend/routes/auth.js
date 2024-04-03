var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");

router.get("/google_signin", authController.signinGoogle);
router.get("/google_signin/callback", authController.googleSigninCallback);
router.get("/google_signin/error", authController.googleSigninError);

// router.get("/google/success", async (req, res) => {
//   const { failure, success } = await googleAuth.registerWithGoogle(req.user);
//   if (failure) console.log("Google user already exist in DB..");
//   else console.log("Registering new Google user..");
//   // res.render("success", { user: userProfile });
//   res.status(201).json({ user: userProfile });
// });

// Not implemented in final site as it is so complicated for test project

router.get("/facebook_signin", authController.signinFacebook);
router.get("/facebook_signin/callback", authController.facebookSigninCallback);
router.get("/facebook_signin/error", authController.facebookSigninError);

module.exports = router;

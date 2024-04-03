const User = require("../../models/userModel");

const facebookAuth = {
  // registerWithFacebook: async (oauthUser) => {
  //   const isUserExists = await User.findOne({
  //     providerId: oauthUser.id,
  //     provider: oauthUser.provider,
  //   });
  //   if (isUserExists) {
  //     const failure = {
  //       message: "User already Registered.",
  //     };
  //     return { failure };
  //   }

  //   const user = new User({
  //     providerId: oauthUser.id,
  //     name: oauthUser.displayName,
  //     provider: oauthUser.provider,
  //     email: oauthUser.emails[0].value, //optional - storing it as extra info
  //     photoURL: oauthUser.photos[0].value, //optional
  //   });
  //   await user.save();
  //   const success = {
  //     message: "User Registered.",
  //   };
  //   return { success };
  // },

  validateUser: async (oauthUser) => {
    // console.log(oauthUser);
    const user = await User.findOne({ email: oauthUser.email });
    if (user) {
      return user;
    } else {
      const user = new User({
        username: oauthUser.username,
        firstName: oauthUser.firstName,
        lastName: oauthUser.lastName,
        email: oauthUser.email,
        isActive: true, //optional
      });
      await user.save();
      return user;
    }
  },
};

module.exports = facebookAuth;

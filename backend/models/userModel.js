const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("../models/postModel");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  }, // URL or file path to the profile picture
  coverPicture: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pendingFriends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
});

// userSchema.virtual("getAllPosts").get(function () {
//   try {
//     // Populate the 'posts' field to get all details of the posts
//     this.populate("posts").execPopulate();
//     return this.posts;
//   } catch (error) {
//     throw error;
//   }
// });

userSchema.methods.getAllPosts = async function () {
  try {
    // Populate the 'posts' field to get all details of the posts
    await this.populate("posts");

    // Now, loop through each post and populate the 'comments.provider' path
    await Promise.all(
      this.posts.map(async (post) => {
        await post.populate("comments.provider", "firstName lastName username profilePicture");
      })
    );

    return this.posts;
  } catch (error) {
    throw error;
  }
};

// Compile the schema into a model and export the model
module.exports = mongoose.model("User", userSchema);

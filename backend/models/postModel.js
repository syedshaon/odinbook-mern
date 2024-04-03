const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const postSchema = new Schema({
  text: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      text: String,
      provider: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      provider: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);

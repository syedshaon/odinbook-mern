const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Author = require("./authorModel");

const refreshTokenSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blackjwtSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

// Compile the schema into a model
// Export the model
module.exports = mongoose.model("BlackJWT", blackjwtSchema);

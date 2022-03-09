const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  userID: { type: String, required: false },
  // searchedMedia: {type: }
  // Includes users watch list, favs and recently watched categories
  arrMediaObj: { type: Array, required: true },
  friendsList: { type: Array, required: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

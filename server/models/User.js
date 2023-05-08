const { Schema, model } = require("mongoose");
const plantSchema = require("./Plant");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // brings in an array of objects
  plant: [
    plantSchema
  ],
});

const User = model("User", userSchema);
module.exports = User;

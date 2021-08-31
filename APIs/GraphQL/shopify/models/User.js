const { Schema, model } = require("mongoose");

const mUser = new Schema(
  {
    lastname: { type: String },
    othernames: { type: String },
    phonenumber: { type: String},
    email: { type: String , unique: true},
    password: { type: String },
  },
  { timestamps: true }
);

mUser.index({ phonenumber: 1 });

module.exports = model("users", mUser);

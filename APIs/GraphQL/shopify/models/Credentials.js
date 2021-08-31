const { Schema, model } = require("mongoose");

const mCredentials = new Schema(
  {
    platform: { type: String },
    // auth_url: { type: String },
    user_id: { type: String },
    access_token: { type: String },
    other_details: { type: String },
  },
  { timestamps: true }
);

module.exports = model("credentials", mCredentials);

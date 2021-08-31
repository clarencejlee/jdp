const { Schema, model } = require("mongoose");

const mPlatform = new Schema(
  {
    name: { type: String, enum: ["shopify", "facebook", "instagram"] },
    apiKey: { type: String, require: true },
    secret: { type: String },
  },
  { timestamps: true }
);

module.exports = model("platforms", mPlatform);

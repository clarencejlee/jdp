const Router = require("express");
const { requestPermanentToken } = require("../controllers/Shopify");
const cache = require("memory-cache");
const Credentials = require("../models/Credentials");
const { Schema, Types } = require("mongoose");
const { REDIRECT_URL } = require("../config");

const route = Router();

route.get("/api/redirect", async (req, res) => {
  requestPermanentToken(req.query, async (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const user = cache.get(req.query.shop);
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      //   console.log(user);
    await Credentials.findOneAndReplace(
        {
          platform: "shopify",
          user_id: parsedUser._id,
        },
        {
          access_token: data.access_token,
          user_id: parsedUser._id,
          platform: "shopify",
          other_details: req.query.shop,
        },
        { upsert: true }
      );
        // Redirect
      res.redirect(REDIRECT_URL);
    }
  });

  //   res.send(token.message)
});

module.exports = route;

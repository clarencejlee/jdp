const Mongo = require("mongoose");

async function connectToDb(
  databaseURl = "mongodb+srv://Shopify:Shopify@020@cluster0.ordm0.mongodb.net/Shopify?retryWrites=true&w=majority"
) {
  // "mongodb://localhost:27017/shopify"
  try {
    await Mongo.connect(databaseURl, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected successfully");
  } catch (e) {
    throw e;
  }
}

module.exports = {
  connectToDb,
};

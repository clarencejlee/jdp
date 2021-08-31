const Credentials = require("../models/Credentials");
const Platform = require("../models/Platform");

async function addPlatform(args) {
  try {
    return await new Platform({ ...args.input }).save();
  } catch (e) {
    throw e;
  }
}

async function getAllPlatforms() {
  return await Platform.find();
}

async function addCredential(args) {
  try {
    return await new Credentials({ ...args.input }).save();
  } catch (e) {
    throw e;
  }
}

async function removeCredential(args) {
  console.log(args);
  try {
    await Credentials.findByIdAndDelete(args.input._id);
    return true;
  } catch (e) {
    throw e;
  }
}

async function getUserCredentails(args) {
  try {
    const cred = await Credentials.find({ user_id: args }).lean();
    // console.log(cred);
    return cred;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  addPlatform,
  getAllPlatforms,
  getUserCredentails,
  removeCredential,
  addCredential,
  
};

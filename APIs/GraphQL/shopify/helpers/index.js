const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateToken(user) {
  return jwt.sign(user, "3234234234342");
}

function decipherToken(token) {
  return jwt.decode(token, "3234234234342");
}

async function hashPassword(password) {
  const hashed = "";
  console.log(password);

  return await bcrypt.hash(password, 4);
}

async function comparePassword(plainText, savedPassword) {
  return await bcrypt.compare(plainText, savedPassword);
}

module.exports = {
  generateToken,
  decipherToken,
  hashPassword,
  comparePassword,
};

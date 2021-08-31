const { hashPassword, generateToken, comparePassword } = require("../helpers");
const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");

async function addUser(args) {
  try {
    //TODO: Hash password
    //Tokenize user Data
    const { input } = args;
    //Hash password
    // console.log(input);
    const hashedPassword = await hashPassword(input.password);
    // console.log(hashedPassword);
    const nUser = await new User({ ...input, password: hashedPassword }).save();

    const token = await generateToken({
      _id: nUser._id,
      firstname: nUser.firstname,
      lastname: nUser.lastname,
      email: nUser.email,
    });

    return {
      token: token,
      User: nUser,
    };
  } catch (e) {
    throw { message: e };
  }
}

async function loginUser(args) {
  const { input } = args;

  //Find user in database;

  const nUser = await User.findOne({ email: input.email });
  // console.log(nUser);
  if (!nUser) {
    return new AuthenticationError("Account not found");
  } else {
    if (await comparePassword(input.password, nUser.password)) {
      const token = await generateToken({
        _id: nUser._id,
        firstname: nUser.firstname,
        lastname: nUser.lastname,
        email: nUser.email,
      });

      console.log(token)

      return {
        token: token,
        User: nUser,
      };
    } else {
      return new AuthenticationError("Invalid Email or Password");
    }
  }
}

async function getUsers(filters) {
  const n = await User.find({ ...filters }).lean();
  console.log(n);
  return n;
}

async function editUser(args){
 return await User.findByIdAndUpdate(args._id, {...args.data});
}

module.exports = {
  addUser,
  getUsers,
  loginUser,
  editUser
};

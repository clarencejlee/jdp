const {
  addUser,
  getUsers: users,
  loginUser,
  editUser,
} = require("../../controllers/User");

module.exports = {
  Mutation: {
    async signUpUser(_, args) {
      return await addUser(args);
    },
    async loginUser(_, args) {
      return await loginUser(args);
    },
    async editUser(_, args) {
      const input = args.input;
      return await editUser(input);
    },
  },
  Query: {
    async getUsers(_, args) {
      return await users();
    },
   
  },
};

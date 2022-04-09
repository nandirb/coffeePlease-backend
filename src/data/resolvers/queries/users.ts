import { Users } from "../../../db/models";
import { IContext } from "../../types";

const userQueries = {
  async userDetail(_root, { _id }: { _id: string }) {
    return await Users.findOne({ _id });
  },

  async users(_root) {
    return await Users.find();
  },

  async currentUser(_root, _args, { user }: IContext) {
    if (user) {
      return await Users.findOne({ _id: user._id });
    }
    return null;
  },
};

export default userQueries;

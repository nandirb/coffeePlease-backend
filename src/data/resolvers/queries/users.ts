import { Users } from "../../../db/models";
import { IContext } from "../../types";

const userQueries = {
  /**
   * Get one user
   */
  async userDetail(_root, { _id }: { _id: string }) {
    return await Users.findOne({ _id });
  },

  /**
   * Current user
   */
  async currentUser(_root, _args, { user }: IContext) {
    if (user) {
      return await Users.findOne({ _id: user._id });
    }
    return null;
  },
};

export default userQueries;

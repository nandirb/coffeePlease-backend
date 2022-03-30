import * as express from "express";
import { Users } from "../../../db/models";
import { IUser } from "../../../db/models/definitions/user";
import { IContext } from "../../types";
import { authCookieOptions } from "../../utils";

interface ILogin {
  email?: string;
  password?: string;
}

interface IUsersUpdate extends IUser {
  _id: string;
}

const login = async (args: ILogin, res: express.Response, secure: boolean) => {
  console.log("backlogin", args);
  const response = await Users.login(args);
  const { token } = response;
  res.cookie("auth-token", token, authCookieOptions(secure));
  return token;
};

const userMutations = {
  /*
   * Register
   */
  async register(
    _root,
    args: ILogin & { confirmPass: string },
    { res, requestInfo }: IContext
  ) {
    if (!args.password) {
      throw new Error("confirm pass is bad");
    }
    await Users.createUser({
      ...args,
      // deviceTokens: args.deviceToken ? [args.deviceToken] : [],
      createdAt: new Date(),
    });
    return login({ ...args }, res, requestInfo.secure);
  },

  /*
   * Login
   */
  async login(_root, args: ILogin, { res, requestInfo }: IContext) {
    return login(args, res, requestInfo.secure);
  },

  async logout(_root, _args, { res }) {
    res.clearCookie("auth-token");
    return "loggedout";
  },

  /*
   * Change user password
   */
  usersChangePassword(
    _root,
    args: { currentPassword: string; newPassword: string },
    { user }: IContext
  ) {
    return Users.changePassword({ _id: user._id, ...args });
  },

  /*
   * Update user
   */
  async usersUpdate(_root, args: IUsersUpdate) {
    const { _id } = args;

    const updatedUser = await Users.updateUser(_id, args);

    return updatedUser;
  },
};

export default userMutations;

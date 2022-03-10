import * as jwt from "jsonwebtoken";

import { Users } from "./db/models";

interface JwtPayload {
  user: string;
}

const userMiddleware = async (req, _res, next) => {
  const token = req.cookies["auth-token"];

  if (token) {
    try {
      // verify user token and retrieve stored user information
      const { user } = jwt.verify(token, Users.getSecret()) as JwtPayload;

      // save user in request
      req.user = user;
      req.user.loginToken = token;
    } catch (e) {
      return next();
    }
  }

  next();
};

export default userMiddleware;

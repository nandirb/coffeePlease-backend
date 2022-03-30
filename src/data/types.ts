import * as express from "express";

import { IUserDocument } from "../db/models/definitions/user";

export interface IContext {
  res: express.Response;
  requestInfo: any;
  user: IUserDocument;
}

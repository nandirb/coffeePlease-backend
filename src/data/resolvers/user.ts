import { IUserDocument } from "../../db/models/definitions/user";
export default {
  fullName(user: IUserDocument) {
    return (user.firstName || "").concat(
      user.firstName ? " " : "",
      user.lastName || ""
    );
  },
};

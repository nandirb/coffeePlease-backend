import { IUserDocument } from "../../db/models/definitions/users";
export default {
  fullName(user: IUserDocument) {
    return (user.firstName || "").concat(
      user.firstName ? " " : "",
      user.lastName || ""
    );
  },
};

import { userFactory } from "../db/factories";
import { Users } from "../db/models";
import "./setup.ts";

describe("User db utils", () => {
  let _user;
  const strongPassword = "Password123"

  test("Create user", async () => {
    const userObjWithoutCode = await Users.createUser({
      password: strongPassword,
      email: "qwerty@qwerty.com",
    });

    if (!userObjWithoutCode.details) {
      throw new Error("User not found");
    }

    expect(userObjWithoutCode).toBeDefined();
    expect(userObjWithoutCode._id).toBeDefined();
    expect(userObjWithoutCode.email).toBe("qwerty@qwerty.com");

    const userObjWithCode = await Users.createUser({
      ..._user._doc,
      email: "qwerty123@qwerty.com",
    });

    expect(userObjWithCode.code).toBe("001");
    expect(userObjWithCode.email).toBe("qwerty123@qwerty.com");
  });

  test("Create user with empty string password", async () => {
    try {
      await Users.createUser({
        password: "",
        email: "123@qwerty.com",
      });
    } catch (e) {
      expect(e.message).toBe("Password can not be empty");
    }
  });

  test("Change password: successful", async () => {
    const user = await userFactory({});

    const updatedUser = await Users.changePassword({
      _id: user._id,
      currentPassword: "pass",
      newPassword: strongPassword,
    });

    if (!updatedUser || !updatedUser.password) {
      throw new Error("Updated user not found");
    }

    expect(
      await Users.comparePassword(strongPassword, updatedUser.password)
    ).toBeTruthy();
  });
});

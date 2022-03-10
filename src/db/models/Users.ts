import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Model, model } from "mongoose";
import sha256 from "sha256";
import { generateRandomString } from "../../data/utils";
import { IUser, IUserDocument, userSchema } from "./definitions/users";

const SALT_WORK_FACTOR = 10;

export interface IUserModel extends Model<IUserDocument> {
  getUser(_id: string): Promise<IUserDocument>;
  checkPassword(password: string): void;
  checkDuplication({
    email,
    idsToExclude,
    phoneNumber,
  }: {
    email?: string;
    idsToExclude?: string | string[];
    phoneNumber?: string;
  }): never;
  getSecret(): string;
  generateToken(): { token: string; expires: Date };
  createUser(doc: IUser): Promise<IUserDocument>;
  updateUser(_id: string, doc: IUser): Promise<IUserDocument>;
  generatePassword(password: string): Promise<string>;
  comparePassword(password: string, userPassword: string): boolean;
  changePassword({
    _id,
    currentPassword,
    newPassword,
  }: {
    _id: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<IUserDocument>;
  forgotPassword(email: string): string;
  createTokens(_user: IUserDocument, secret: string): string[];
  refreshTokens(refreshToken: string): {
    token: string;
    refreshToken: string;
    user: IUserDocument;
  };
  login({ email, password }: { email?: string; password?: string }): {
    token: string;
    refreshToken: string;
  };
}

export const loadClass = () => {
  class User {
    public static async getUser(_id: string) {
      const user = await Users.findOne({ _id });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }

    public static checkPassword(password: string) {
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
        throw new Error(
          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        );
      }
    }
    /**
     * Checking if user has duplicated properties
     */
    public static async checkDuplication({
      email,
      phoneNumber,
      idsToExclude,
    }: {
      email?: string;
      phoneNumber?: string;
      idsToExclude?: string;
    }) {
      const query: { [key: string]: any } = {};
      let previousEntry;

      // Adding exclude operator to the query
      if (idsToExclude) {
        query._id = { $ne: idsToExclude };
      }

      // Checking if user has email
      if (email) {
        previousEntry = await Users.find({ ...query, email });

        // Checking if duplicated
        if (previousEntry.length > 0) {
          throw new Error("Duplicated email");
        }
      }

      if (phoneNumber) {
        previousEntry = await Users.find({ ...query, phoneNumber });

        // Checking if duplicated
        if (previousEntry.length > 0) {
          throw new Error("Duplicated phone number");
        }
      }
    }

    public static getSecret() {
      return process.env.JWT_TOKEN_SECRET || "";
    }

    /**
     * Create new user
     */
    public static async createUser(doc: IUser) {
      // empty string password validation
      if (doc.password === "") {
        throw new Error("Password can not be empty");
      }

      // Checking duplicated email
      await Users.checkDuplication({
        email: doc.email,
        // phoneNumber: doc.phoneNumber,
      });

      this.checkPassword(doc.password);

      return Users.create({
        ...doc,
        isActive: true,
        // hash password
        password: await this.generatePassword(doc.password),
      });
    }

    /**
     * Update user information
     */
    public static async updateUser(
      _id: string,
      { firstName, lastName, email, phoneNumber }: IUser
    ) {
      const savedUser = await Users.findOne({ _id });

      const doc = {
        firstName: firstName || savedUser.firstName,
        lastName: lastName || savedUser.lastName,
        email: email || savedUser.email,
        phoneNumber: phoneNumber || savedUser.phoneNumber,
      };

      // Checking duplicated email
      await this.checkDuplication({ email, phoneNumber, idsToExclude: _id });

      await Users.updateOne({ _id }, { $set: doc });

      return Users.findOne({ _id });
    }

    public static async generateToken() {
      const buffer = await crypto.randomBytes(20);
      const token = buffer.toString("hex");

      return {
        token,
        expires: Date.now() + 86400000,
      };
    }

    /*
     * Generates new password hash using plan text password
     */
    public static generatePassword(password: string) {
      const hashPassword = sha256(password);
      return bcrypt.hash(hashPassword, SALT_WORK_FACTOR);
    }

    /*
      Compare password
    */
    public static comparePassword(password: string, userPassword: string) {
      const hashPassword = sha256(password);

      return bcrypt.compare(hashPassword, userPassword);
    }

    /*
     * Change user password
     */
    public static async changePassword({
      _id,
      currentPassword,
      newPassword,
    }: {
      _id: string;
      currentPassword: string;
      newPassword: string;
    }) {
      // Password can not be empty string
      if (newPassword === "") {
        throw new Error("Password can not be empty");
      }

      this.checkPassword(newPassword);

      const user = await Users.getUser(_id);

      // check current password ============
      const valid = await this.comparePassword(currentPassword, user.password);

      if (!valid) {
        throw new Error("Incorrect current password");
      }

      // set new password
      await Users.updateOne(
        { _id: user._id },
        {
          $set: {
            password: await this.generatePassword(newPassword),
          },
        }
      );

      return Users.findOne({ _id: user._id });
    }

    /*
     * Sends reset password link to found user's email
     */
    public static async forgotPassword(email: string) {
      // find user
      const user = await Users.findOne({ email });

      if (!user) {
        throw new Error("Invalid email");
      }

      // create the random token
      const newPass = generateRandomString();
      const newPassword = await Users.generatePassword(newPass);

      // save token & expiration date
      await Users.updateOne(
        { _id: user._id },
        {
          $set: {
            resetPassword: newPassword,
            resetPasswordExpires: Date.now() + 86400000,
          },
        }
      );

      return newPass;
    }

    /*
     * Creates regular and refresh tokens using given user information
     */
    public static async createTokens(_user: IUserDocument, secret: string) {
      const user = {
        _id: _user._id,
        email: _user.email,
        // phoneNumber: _user.phoneNumber,
      };

      const createToken = await jwt.sign({ user }, secret, { expiresIn: "1d" });

      const createRefreshToken = await jwt.sign({ user }, secret, {
        expiresIn: "7d",
      });

      return [createToken, createRefreshToken];
    }

    /*
     * Renews tokens
     */
    /* public static async refreshTokens(refreshToken: string) {
      let _id = "";

      try {
        // validate refresh token
        const { user } = jwt.verify(refreshToken, this.getSecret());

        _id = user._id;
        // if refresh token is expired then force to login
      } catch (e) {
        return {};
      }

      const dbUser = await Users.getUser(_id);

      // recreate tokens
      const [newToken, newRefreshToken] = await this.createTokens(
        dbUser,
        this.getSecret()
      );

      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user: dbUser,
      };
    } */

    /*
     * Validates user credentials and generates tokens
     */
    public static async login({
      email,
      password,
    }: {
      email?: string;
      password?: string;
    }) {
      const filter = [];
      if (email) {
        filter.push({ email: { $regex: new RegExp(`^${email}$`, "i") } });
      }
      const user = await Users.findOne({
        $or: filter,
        isActive: true,
      });

      if (!user || !user.password) {
        // user with provided email not found
        throw new Error("Invalid login");
      }

      const valid = await this.comparePassword(password, user.password);

      if (!valid) {
        // check reseted password
        if (await this.comparePassword(password, user.resetPassword)) {
          // if login in reseted password then password change
          await Users.updateOne(
            { _id: user._id },
            {
              $set: {
                password: await this.generatePassword(user.resetPassword),
              },
            }
          );
        } else {
          // bad password
          throw new Error("Invalid login");
        }
      }

      // create tokens
      const [token, refreshToken] = await this.createTokens(
        user,
        this.getSecret()
      );

      return {
        token,
        refreshToken,
      };
    }
  }

  userSchema.loadClass(User);

  return userSchema;
};

loadClass();

// tslint:disable-next-line
const Users = model<IUserDocument, IUserModel>("users", userSchema);

export default Users;
